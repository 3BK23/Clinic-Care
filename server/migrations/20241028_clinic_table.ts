import {Knex} from "knex";

export async function up(knex:Knex):Promise<void>{

    await knex.schema.createTable('doctors',(table)=>{
        table.increments('id').primary();
        table.string('username', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('doctor_name', 255).notNullable();
        table.string('clinic_name', 255).notNullable();
    });

    await knex.schema.createTable('patients', (table)=>{
        table.increments('id').primary();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('hkid_number',255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.enum('gender',['male','female']).notNullable();
        table.timestamp('birth_date').notNullable();
        table.bigInteger('phone_number').notNullable();
        table.string('emergency_name',255).notNullable();
        table.bigInteger('emergency_contact').notNullable();
        table.timestamps(true, true)
    });

    await knex.schema.createTable('tickets', (table)=>{
        table.increments('id').primary();
        table.bigInteger('number');
        table.enum('status',['waiting','consulting','completed']).defaultTo('waiting');
        table.bigInteger('patients_id').unsigned().notNullable();
        table.foreign('patients_id').references('id').inTable('patients')
    });

    await knex.schema.createTable('queue', (table)=>{
        table.increments('id').primary();
        table.bigInteger('ticket_id').unsigned().notNullable;
        table.foreign('ticket_id').references('id').inTable('tickets');
        table.bigInteger('queue_position');
    })
}

export async function down(knex:Knex):Promise<void>{
    await knex.schema.dropTableIfExists('doctors');
    await knex.schema.dropTableIfExists('patients');
    await knex.schema.dropTableIfExists('tickets');
    await knex.schema.dropTableIfExists('queue');
}