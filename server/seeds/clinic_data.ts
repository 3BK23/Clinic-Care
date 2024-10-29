import knex, { Knex } from "knex";

export async function seed(knex:Knex):Promise<void>{

    await knex.raw('TRUNCATE TABLE doctors, patients, tickets, queue CASCADE');

    await knex('doctors').insert([
        {
            username: "Johnlam",
            password: "1234",
            doctor_name:"John Lam",
            clinic_name: "John Medical"
        }
    ]);

    await knex('patients').insert([
        {
            first_name: "Chan",
            last_name: "Mary",
            hkid_number: `Z123456(1)`,
            password:"1234",
            gender: "female",
            birth_date:"1966-06-15",
            phone_number: 6597563,
            emergency_name: "Karen Chan",
            emergency_contact: 54226659
        }
    ])

    await knex('tickets').insert([
        {
            number: 1,
            status: "waiting",
            patients_id: 1
        }
    ])

    await knex("queue").insert([
        {
            ticket_id: 1,
            queue_position:1
        }
    ])
}
