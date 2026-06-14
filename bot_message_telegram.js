try {
    // 1. Captura e converte os parâmetros passados pelo Zabbix
    var params = JSON.parse(value);
    var req = new HttpRequest();

    // 2. Configura o cabeçalho
    req.addHeader('Content-Type: application/json');

    // 3. Monta o corpo da mensagem
    var body = {
        chat_id: params.To,
        text: params.Message,
        parse_mode: 'Markdown' // Opcional: permite usar negrito/itálico
    };

    // 4. Envia a requisição
    // O token do bot deve ser configurado como parâmetro de mídia no Zabbix
    // Vá em: Administração > Tipos de mídia > Telegram > Parâmetros
    // Adicione um parâmetro chamado "Token" com o valor do seu bot
    var response = req.post(
        "https://api.telegram.org/bot" + params.Token + "/sendMessage",
        JSON.stringify(body)
    );

    // 5. Verifica o resultado
    if (req.getStatus() !== 200) {
        throw 'Error: ' + response;
    }

    return 'OK';
} catch (error) {
    Zabbix.log(3, 'Telegram notification failed: ' + error);
    throw 'Telegram notification failed: ' + error;
}
