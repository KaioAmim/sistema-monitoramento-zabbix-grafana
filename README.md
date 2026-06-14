# 🐳 Stack de Monitoramento com Zabbix + Grafana (Docker)

Stack de monitoramento baseada em **Zabbix**, **Grafana** e **PostgreSQL**, implantada com Docker Compose para monitoramento de disponibilidade de equipamentos de rede, visualização de dashboards e envio de alertas via Telegram.

---

## 📦 Serviços

| Serviço         | Imagem                              | Porta    |
|-----------------|-------------------------------------|----------|
| PostgreSQL      | `postgres:15`                       | interno  |
| Zabbix Server   | `zabbix/zabbix-server-pgsql:latest` | `10051`  |
| Zabbix Web UI   | `zabbix/zabbix-web-nginx-pgsql:latest` | `8082`|
| Grafana         | build local (`./grafana`)           | `3000`   |

---

## ⚙️ Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

---

## 🚀 Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha_forte
POSTGRES_DB=zabbixdb
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=sua_senha_grafana
```

> ⚠️ **Nunca suba o arquivo `.env` para o GitHub.** Ele já está no `.gitignore`.

### 3. Suba os containers

```bash
docker compose -f docker-compose-zabbix.yml up -d
```

### 4. Acesse as interfaces

| Interface    | URL                    | Usuário padrão |
|--------------|------------------------|----------------|
| Zabbix Web   | http://localhost:8082  | `Admin` / `zabbix` |
| Grafana      | http://localhost:3000  | definido no `.env` |

---

## 📲 Integração com Telegram

O arquivo `bot_message_telegram.js` é um script de media type para o Zabbix enviar alertas via Telegram.

### Como configurar no Zabbix:

1. Acesse **Administração > Tipos de mídia**
2. Crie um novo tipo do tipo **Webhook**
3. Cole o conteúdo de `bot_message_telegram.js` no campo de script
4. Adicione os seguintes **parâmetros**:

| Nome      | Valor                        |
|-----------|------------------------------|
| `To`      | `{ALERT.SENDTO}`             |
| `Message` | `{ALERT.MESSAGE}`            |
| `Token`   | `<seu token do bot Telegram>`|

5. Configure o usuário no Zabbix para receber alertas por esse tipo de mídia

> 💡 O token do bot é configurado diretamente no Zabbix e **nunca fica no código-fonte**.

---

## 📁 Estrutura do projeto

```
.
├── docker-compose-zabbix.yml   # Orquestração dos serviços
├── bot_message_telegram.js     # Script de alerta via Telegram (Zabbix webhook)
├── grafana.json                # Dashboard do Grafana (exportado)
├── zabbix.json                 # Configuração exportada do Zabbix
├── .env.example                # Modelo de variáveis de ambiente
├── .env                        
└── .gitignore
```

---

## 🔒 Segurança

- Todas as senhas e tokens são gerenciados via variáveis de ambiente (`.env`)
- O `.env` está listado no `.gitignore` e **nunca deve ser commitado**
- O token do bot Telegram é passado como parâmetro no Zabbix, não hardcoded no script
