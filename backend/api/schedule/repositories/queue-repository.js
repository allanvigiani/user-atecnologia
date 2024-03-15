const connectRabbitMq = require('./queue-connection');

class QueueRepository {
 
    async sendToQueue(queue, message) {
        const channel = await connectRabbitMq();
        try {
            await channel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Enviado '%s'", message);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    }

    async consumeQueue(queue) {
        const channel = await connectRabbitMQ();
        console.log(" [*] Aguardando por mensagens em %s.", queue);
        channel.consume(queue, message => {
            if (message !== null) {
                console.log(" [x] Recebido '%s'", message.content.toString());
                channel.ack(message);
            }
        });
    }

}

export default QueueRepository;