# Solução para GitHub MCP Travado no "Loading tools"

## Problema
O servidor MCP do GitHub está travado mostrando "Loading tools" indefinidamente.

## Soluções

### Solução 1: Desabilitar e Reabilitar no Cursor (RECOMENDADO)

1. **Abra as configurações do Cursor:**
   - Pressione `Ctrl+,` (ou `Cmd+,` no Mac)
   - Ou vá em `File > Preferences > Settings`

2. **Procure por "MCP" ou "GitHub" nas configurações**

3. **Desabilite o GitHub MCP:**
   - Encontre o toggle do GitHub MCP
   - **Desligue** o switch (deixe em OFF)

4. **Reinicie o Cursor completamente:**
   - Feche todas as janelas do Cursor
   - Abra novamente

5. **Reabilite o GitHub MCP:**
   - Vá novamente nas configurações
   - **Ligue** o switch do GitHub MCP (deixe em ON)

6. **Aguarde alguns segundos** para o servidor inicializar corretamente

### Solução 2: Adicionar Token do GitHub (Se necessário)

Se após reiniciar o GitHub MCP ainda não funcionar, você pode precisar de um token de acesso pessoal:

1. **Criar um token no GitHub:**
   - Acesse: https://github.com/settings/tokens
   - Clique em "Generate new token (classic)"
   - Dê um nome ao token
   - Selecione as permissões necessárias (pelo menos `repo` se quiser acesso a repositórios privados)
   - Clique em "Generate token"
   - **Copie o token** (você não verá novamente)

2. **Configurar no Cursor:**
   - Abra o arquivo `.cursor/mcp.json` na raiz do projeto
   - Substitua `"GITHUB_PERSONAL_ACCESS_TOKEN": ""` pelo seu token:
     ```json
     "env": {
       "GITHUB_PERSONAL_ACCESS_TOKEN": "seu_token_aqui"
     }
     ```

3. **Reinicie o Cursor**

### Solução 3: Limpar Cache e Reiniciar

1. **Feche o Cursor completamente**

2. **Limpe o cache do npm:**
   ```powershell
   npm cache clean --force
   ```

3. **Reabra o Cursor**

### Solução 4: Verificar Processos Travados

Se nada funcionar, pode haver processos Node.js travados:

1. **Abra o Gerenciador de Tarefas** (Ctrl+Shift+Esc)

2. **Procure por processos "node.exe"**

3. **Encerre processos suspeitos** relacionados ao Cursor/GitHub MCP

4. **Reinicie o Cursor**

## Configuração Atual

O arquivo `.cursor/mcp.json` foi atualizado com a configuração do GitHub MCP. Se você já tem um token, adicione-o ao campo `GITHUB_PERSONAL_ACCESS_TOKEN`.

## Verificação

Após aplicar qualquer solução:
- O status do GitHub MCP deve mostrar um **indicador verde**
- Você deve ver as ferramentas disponíveis (não mais "Loading tools")
- O toggle deve estar em ON

## Nota

O Cursor geralmente gerencia o GitHub MCP automaticamente. Se o problema persistir mesmo após tentar essas soluções, pode ser necessário verificar as configurações globais do Cursor em:
- Windows: `%APPDATA%\Cursor\User\settings.json`



