import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProucerService implements OnModuleInit, OnApplicationShutdown {

    // Connect to Kafka Server
    private readonly kafka = new Kafka({
        clientId: 'exhibits',
        brokers: [`localhost:${+process.env.KAFKA_PORT}`]
    });

    private readonly producer: Producer = this.kafka.producer();


    async onModuleInit() {
        // Connect Producer on Module initialization
        await this.producer.connect();
    }

    async produce(record: ProducerRecord) {
        //Send Records to Kafka to producer
        this.producer.send(record);

    }

    async onApplicationShutdown() {
        //Disconnect producer on Application ShutDown
        await this.producer.disconnect();
    }



}