# Configuração do MCP Server Supabase no Cursor

## Instruções de Instalação

Para configurar o MCP Server do Supabase no Cursor, siga estes passos:

### Opção 1: Configuração via Interface do Cursor (Recomendado)

1. Abra as configurações do Cursor (Ctrl+, ou Cmd+,)
2. Procure por "MCP" ou "Model Context Protocol" nas configurações
3. Adicione a seguinte configuração:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest"
      ]
    }
  }
}
```

### Opção 2: Configuração via Arquivo

1. Crie o diretório `.cursor` na raiz do projeto (se não existir)
2. Crie o arquivo `.cursor/mcp.json` com o seguinte conteúdo:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest"
      ]
    }
  }
}
```

### Autenticação

Após configurar, ao usar o servidor pela primeira vez:
- Uma janela do navegador será aberta automaticamente
- Faça login na sua conta do Supabase
- Conceda as permissões necessárias ao cliente MCP

### Modo Somente Leitura (Opcional)

Para maior segurança, você pode configurar o servidor em modo somente leitura adicionando `--read-only`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only"
      ]
    }
  }
}
```

### Verificação

Após a configuração:
- Reinicie o Cursor
- Você deverá ver um indicador verde mostrando as ferramentas disponíveis do Supabase MCP
- Isso confirma que a integração foi bem-sucedida

### Troubleshooting

Se encontrar problemas de conexão no Windows, tente executar o servidor diretamente no terminal:

```bash
npx -y @supabase/mcp-server-supabase@latest
```

## Recursos Disponíveis

Uma vez configurado, você terá acesso a:
- Listagem de tabelas e schemas
- Execução de queries SQL
- Aplicação de migrações
- Visualização de logs
- Gerenciamento de Edge Functions
- E muito mais!


