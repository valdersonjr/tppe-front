import pytest
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.mark.auth
class TestAuthentication:
    
    def test_redirect_to_login_when_not_authenticated(self, auth_page):
        """Test that unauthenticated users are redirected to login"""
        auth_page.goto_home()
        auth_page.wait_for_redirect("/auth/login")
        assert auth_page.is_on_login_page()
    
    def test_register_with_mismatched_passwords(self, auth_page, test_user):
        """Test registration fails with mismatched passwords"""
        auth_page.goto_register()
        
        # Fill form with mismatched passwords
        auth_page.fill_register_form(
            name=test_user["name"],
            email=test_user["email"],
            password=test_user["password"],
            confirm_password="different_password"
        )
        
        # Submit form
        auth_page.submit_form()
        
        # Should show error message and stay on register page
        time.sleep(1)  # Wait for error to appear
        error_message = auth_page.get_error_message()
        assert error_message is not None
        assert "senhas não coincidem" in error_message.lower()
        assert auth_page.is_on_register_page()
    
    def test_register_with_short_password(self, auth_page, test_user):
        """Test registration fails with password too short"""
        auth_page.goto_register()
        
        short_password = "123"
        auth_page.fill_register_form(
            name=test_user["name"],
            email=test_user["email"],
            password=short_password,
            confirm_password=short_password
        )
        
        auth_page.submit_form()
        
        # Should show error about password length
        time.sleep(1)
        error_message = auth_page.get_error_message()
        assert error_message is not None
        assert "pelo menos 6 caracteres" in error_message.lower()
        assert auth_page.is_on_register_page()
    
    def test_login_with_valid_credentials(self, auth_page, test_user):
        """Test login with valid credentials after registration"""
        # First register a user
        auth_page.goto_register()
        auth_page.fill_register_form(
            name=test_user["name"],
            email=test_user["email"],
            password=test_user["password"],
            confirm_password=test_user["password"]
        )
        auth_page.submit_form()
        time.sleep(3)  # Wait for registration to complete
        
        # Go to login page
        auth_page.goto_login()
        
        # Now test login
        auth_page.fill_login_form(
            email=test_user["email"],
            password=test_user["password"]
        )
        auth_page.submit_form()
        
        # Wait and check for success
        time.sleep(3)
        current_url = auth_page.driver.current_url
        print(f"After login, current URL: {current_url}")
        
        # Success can be redirect to products or success message
        is_success = (
            auth_page.is_on_products_page() or 
            "bem-vindo" in auth_page.driver.page_source.lower() or
            "/products" in current_url
        )
        
        assert is_success, f"Login failed. Current URL: {current_url}"
    
    def test_login_with_invalid_credentials(self, auth_page):
        """Test login fails with invalid credentials"""
        auth_page.goto_login()
        
        auth_page.fill_login_form(
            email="invalid@example.com",
            password="wrongpassword"
        )
        auth_page.submit_form()
        
        # Should show error and stay on login page
        time.sleep(3)  # Wait for error to appear
        
        # Check if still on login page (main indicator of failure)
        assert auth_page.is_on_login_page(), "Should stay on login page after invalid credentials"
        
        # Try to find error message (optional check)
        error_message = auth_page.get_error_message()
        current_url = auth_page.driver.current_url
        page_text = auth_page.driver.page_source.lower()
        
        print(f"Login error test - Current URL: {current_url}")
        print(f"Error message found: {error_message}")
        print(f"Page contains 'erro': {'erro' in page_text}")
        
        # At minimum, should not have redirected to products
        assert not auth_page.is_on_products_page(), "Should not redirect to products with invalid credentials"
    
    def test_login_with_empty_fields(self, auth_page):
        """Test login form validation with empty fields"""
        auth_page.goto_login()
        
        # Try to submit empty form
        auth_page.submit_form()
        
        # Should stay on login page (HTML5 validation should prevent submission)
        assert auth_page.is_on_login_page()
    
    def test_navigation_between_login_and_register(self, auth_page):
        """Test navigation links between login and register pages"""
        # Start on login page
        auth_page.goto_login()
        assert auth_page.is_on_login_page()
        
        # Click "Crie uma agora" link to go to register
        register_link = auth_page.driver.find_element(By.LINK_TEXT, "Crie uma agora")
        register_link.click()
        
        # Should be on register page
        auth_page.wait_for_redirect("/auth/register")
        assert auth_page.is_on_register_page()
        
        # Click "Faça login" link to go back to login
        login_link = auth_page.driver.find_element(By.LINK_TEXT, "Faça login")
        login_link.click()
        
        # Should be back on login page
        auth_page.wait_for_redirect("/auth/login")
        assert auth_page.is_on_login_page()
    
    def test_register_form_required_fields(self, auth_page):
        """Test that required fields are validated"""
        auth_page.goto_register()
        
        # Try to submit form without filling required fields
        auth_page.submit_form()
        
        # Should stay on register page due to HTML5 validation
        assert auth_page.is_on_register_page()
    
    def test_login_form_required_fields(self, auth_page):
        """Test that login form required fields are validated"""
        auth_page.goto_login()
        
        # Try to submit form without filling required fields
        auth_page.submit_form()
        
        # Should stay on login page due to HTML5 validation
        assert auth_page.is_on_login_page()