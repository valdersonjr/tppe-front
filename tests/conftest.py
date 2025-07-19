import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture(scope="session")
def driver():
    """Configure and return WebDriver instance"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(10)
    
    yield driver
    
    driver.quit()


@pytest.fixture
def auth_page(driver):
    """Navigate to auth pages and provide helper methods"""
    class AuthPage:
        def __init__(self, driver):
            self.driver = driver
            self.base_url = "http://localhost:3000"
            self.wait = WebDriverWait(driver, 10)
        
        def goto_login(self):
            self.driver.get(f"{self.base_url}/auth/login")
            
        def goto_register(self):
            self.driver.get(f"{self.base_url}/auth/register")
            
        def goto_home(self):
            self.driver.get(f"{self.base_url}/")
            
        def fill_login_form(self, email, password):
            email_field = self.wait.until(
                EC.presence_of_element_located((By.NAME, "email"))
            )
            password_field = self.driver.find_element(By.NAME, "password")
            
            email_field.clear()
            email_field.send_keys(email)
            password_field.clear()
            password_field.send_keys(password)
            
        def fill_register_form(self, name, email, password, confirm_password):
            name_field = self.wait.until(
                EC.presence_of_element_located((By.NAME, "name"))
            )
            email_field = self.driver.find_element(By.NAME, "email")
            password_field = self.driver.find_element(By.NAME, "password")
            confirm_password_field = self.driver.find_element(By.NAME, "confirmPassword")
            
            name_field.clear()
            name_field.send_keys(name)
            email_field.clear()
            email_field.send_keys(email)
            password_field.clear()
            password_field.send_keys(password)
            confirm_password_field.clear()
            confirm_password_field.send_keys(confirm_password)
            
        def submit_form(self):
            submit_button = self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
            submit_button.click()
            
        def wait_for_redirect(self, expected_path="/products", timeout=15):
            """Wait for redirect with better error handling"""
            try:
                WebDriverWait(self.driver, timeout).until(
                    lambda d: expected_path in d.current_url
                )
            except Exception as e:
                current_url = self.driver.current_url
                page_source = self.driver.page_source[:500]  # First 500 chars
                print(f"Redirect failed. Current URL: {current_url}")
                print(f"Expected path: {expected_path}")
                print(f"Page source preview: {page_source}")
                raise e
            
        def get_error_message(self):
            """Get error message with multiple selectors"""
            error_selectors = [
                ".bg-red-50",
                "[class*='bg-red']",
                "[class*='text-red']",
                ".error",
                "[data-testid='error']"
            ]
            
            for selector in error_selectors:
                try:
                    error_element = WebDriverWait(self.driver, 3).until(
                        EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                    )
                    if error_element.is_displayed():
                        return error_element.text
                except:
                    continue
                    
            # Check if there are any visible error messages in the page
            try:
                errors = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'erro') or contains(text(), 'Erro') or contains(text(), 'inválid') or contains(text(), 'não')]")
                for error in errors:
                    if error.is_displayed():
                        return error.text
            except:
                pass
                
            return None
                
        def is_on_login_page(self):
            return "/auth/login" in self.driver.current_url
            
        def is_on_register_page(self):
            return "/auth/register" in self.driver.current_url
            
        def is_on_products_page(self):
            return "/products" in self.driver.current_url
    
    return AuthPage(driver)


@pytest.fixture
def test_user():
    """Provide test user data"""
    return {
        "name": "Test User",
        "email": f"test_{pytest.current_test_id}@example.com",
        "password": "testpass123"
    }


def pytest_configure(config):
    """Add custom markers"""
    config.addinivalue_line("markers", "auth: Authentication related tests")
    config.addinivalue_line("markers", "smoke: Smoke tests")


def pytest_runtest_setup(item):
    """Setup for each test"""
    # Generate unique test ID for each test
    pytest.current_test_id = item.nodeid.replace("::", "_").replace("/", "_")