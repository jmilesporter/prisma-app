import { PrismaClient } from '@prisma/client'
import { CountQueuingStrategy } from 'stream/web'
const prisma = new PrismaClient()

 // const prisma = new PrismaClient({ log: ['query'] })
 // log queries

async function main() {
    await prisma.user.deleteMany()
    // clear data before running
    const user = await prisma.user.create({
        // createMany() to create an array of users
        data: {
            name: 'Alice',
            email: 'alice@test.com',
            age: 30,
            userPreference: {
                create: {
                    emailUpdates: true,
                },
            },
        },
        select: {
            name: true,
            userPreference: { select: { id: true } },
        }
        // include: {
        //     userPreference: true,
        // },
    })
    console.log(user)
    // create function

    const foundUser = await prisma.user.findUnique({
        // findFirst() to find the first user
        // findMany() to find all users
        where: {            
            // id: user.id,

            // email: 'alice@test.com',
            // email: { contains: '@test.com'}

            // name: { equals: 'Alice' },
            // name: { contains: 'A' },
            // name: { startsWith: 'A' },
            // name: { endsWith: 'e' },
            // name: { not: 'Alice' },
            // name: { in: ['Alice', 'Bob'] },
            // name: { notIn: ['Alice', 'Bob'] },
            
            // age: { gt: 20 },
            // age: { gte: 20 },
            // age: { lt: 20 },
            age_name: {
                age: 30,
                name: 'Alice'
            }
        },
        // distinct: ['name'],
        // find all users with a distinct name for example
        select: {
            name: true,
        },
        // orderBy: {
        //     name: 'asc',
        //     age: 'desc',
        // }

        // take: 2,
        // how many users to take
        // skip: 1
        // skip the first user

        // pagination

        // userPreference: {
        //     emailUpdates: true,
        // }
        // example one-to-one relationship

        // writtenPosts: {
        //     every: {
        //         published: true,
        //     },
        //     some: {
        //         trending: true,
        //     },
        // },
        // example one-to-many relationship



        // AND: {}
        // OR: {}
        // NOT: {}
        // nested where
    })
    console.log(foundUser)
    // find/read function

    const posts = await prisma.post.findMany({
        where: {
            author: {
                is: {
                    age: 30,
                }
            },
        },
})
console.log(posts)
// find all the posts written by users who are 30 years old





const updatedUser = await prisma.user.update({
    where: {
       email: 'alice@test.com'
        // or id: user.id,
    },
    data: {
        email: 'alice@nest.com'
    },
    // connect: {
    //     id: user.id,
    // },
    // connect to an existing user

    // disconnect: {
    //     id: user.id,
    // },
    // disconnect from an existing user
    
})
// update function





const deletedUser = await prisma.user.deleteMany({
    where: {
        age: 30
        // id: user.id,
    }
    })
    console.log(deletedUser)
}



main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
    
    
   