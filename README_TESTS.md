# Testes de Autenticação com Selenium

Este diretório contém testes automatizados E2E (End-to-End) para o fluxo de autenticação do ShoppingCart usando Selenium WebDriver.

## 📋 Pré-requisitos

1. **Python 3.8+** instalado
2. **Chrome browser** instalado
3. **ChromeDriver** (será instalado automaticamente via webdriver-manager)
4. **Aplicação rodando** em `http://localhost:3000`

## 🚀 Configuração

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2. Iniciar a aplicação
```bash
npm run dev
```
A aplicação deve estar rodando em `http://localhost:3000`

## 🧪 Executando os Testes

### Executar todos os testes de autenticação
```bash
pytest tests/test_auth.py -v
```

### Executar apenas testes de smoke
```bash
pytest -m smoke -v
```

### Executar com relatório HTML
```bash
pytest tests/test_auth.py --html=reports/auth_tests.html --self-contained-html
```

### Executar modo headless (padrão)
Os testes rodam em modo headless por padrão. Para ver o browser:
```bash
# Edite conftest.py e comente a linha:
# chrome_options.add_argument("--headless")
```

## 📝 Testes Implementados

### Cenários de Registro (`test_register_*`)
- ✅ Registro com dados válidos
- ✅ Registro com senhas não coincidentes
- ✅ Registro com senha muito curta
- ✅ Validação de campos obrigatórios

### Cenários de Login (`test_login_*`)
- ✅ Login com credenciais válidas
- ✅ Login com credenciais inválidas
- ✅ Validação de campos vazios
- ✅ Validação de campos obrigatórios

### Cenários de Navegação
- ✅ Redirecionamento para login quando não autenticado
- ✅ Navegação entre páginas de login e registro
- ✅ Redirecionamento para produtos após autenticação

### Teste de Smoke
- ✅ Fluxo básico completo: Home → Login → Registro → Produtos

## 🏗️ Estrutura dos Arquivos

```
tests/
├── conftest.py          # Configurações e fixtures do pytest
├── test_auth.py         # Testes de autenticação
├── requirements.txt     # Dependências Python
├── pytest.ini         # Configuração do pytest
└── README_TESTS.md     # Esta documentação
```

## 🔧 Fixtures Disponíveis

### `driver`
WebDriver do Chrome configurado com:
- Modo headless
- Timeout implícito de 10s
- Resolução 1920x1080

### `auth_page`
Helper class com métodos para:
- `goto_login()`, `goto_register()`, `goto_home()`
- `fill_login_form()`, `fill_register_form()`
- `submit_form()`, `wait_for_redirect()`
- `get_error_message()`, `is_on_*_page()`

### `test_user`
Dados de usuário único para cada teste:
- Nome, email único, senha padrão

## 🎯 Cenários de Teste Cobertos

1. **Proteção de Rotas**: Usuários não autenticados são redirecionados
2. **Registro de Usuário**: Validações e fluxo de sucesso
3. **Login**: Autenticação e validações
4. **Navegação**: Links entre páginas funcionam corretamente
5. **Validações de Formulário**: Campos obrigatórios e regras de negócio

## 🐛 Troubleshooting

### Chrome não encontrado
```bash
# Linux
sudo apt-get install google-chrome-stable

# macOS
brew install --cask google-chrome
```

### Problemas de rede/timeout
- Verifique se a aplicação está rodando em `localhost:3000`
- Aumente os timeouts em `conftest.py` se necessário

### Tests falhando
- Verifique se o backend está rodando
- Confirme que não há dados conflitantes no banco
- Execute um teste por vez para debugging: `pytest tests/test_auth.py::TestAuthentication::test_register_new_user_success -v`

## 📊 Relatórios

Os testes geram relatórios HTML em `reports/` quando executados com `--html`.
Exemplo de comando completo:

```bash
pytest tests/test_auth.py --html=reports/auth_$(date +%Y%m%d_%H%M%S).html --self-contained-html -v
```