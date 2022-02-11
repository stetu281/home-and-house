const ApolloServer = require('apollo-server').ApolloServer;
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer;
const { gql } = require('apollo-server-lambda');
const mysql = require('mysql2/promise');
const { DateTimeResolver, DateResolver } = require('graphql-scalars');


const typeDefs = gql`

    scalar Date
    scalar DateTime

    type Query {
        estate(id: ID!): Estate
        estates(limit: Int = 50): [Estate!]
        message(id: ID!): Message
        messages: [Message!]
        article(id: ID!): Article
        articles: [Article!]
    }
    type Estate {
        id: ID!
        title: String!
        description: String!
        type: String!
        status: String!
        availability: String!
        availability_date: Date
        area: Int!
        price: Int!
        city: String!
        canton: String!
        country: String!
        zip: Int!
        lat: Float!
        lng: Float!
        img_url: String!
        imgs: String!
        img_cdn: String!
        messages: [Message!]
        created_at: DateTime
        updated_at: DateTime
    }
    type Message {
        id: ID!
        estate_id: String
        firstname: String
        lastname: String
        address: String
        postalcode: String
        city: String
        phonenumber: String
        email: String
        content: String
        information: Boolean
        visit: Boolean
        created_at: DateTime
        updated_at: DateTime
    }
    type Article {
        id: ID!
        title: String
        category: String
        publish_date: String
        excerpt: String
        full_article: String
        img: String
    }
    type Mutation {
        createMessage(
            estate_id: String
            firstname: String
            lastname: String
            address: String
            postalcode: String
            city: String
            phonenumber: String
            email: String
            content: String
            information: Boolean
            visit: Boolean
        ):Message!
    }
`;

const resolvers = {
    DateTime: DateTimeResolver,
    Date: DateResolver,

    Query: {
        estates: async (obj, args, context, info) => {
            const [estates] = await context.db.query(
                `SELECT * FROM estate
                ORDER BY created_at DESC
                LIMIT ?`,
                [args.limit]
            );
            return estates;
        },

        estate: async (obj, args, context, info) => {
            const [estates] = await context.db.query(
                `SELECT * FROM estate WHERE id = ?`, 
                [args.id]
            );
            return estates[0];
        },

        messages: async (obj, args, context, info) => {
            const [messages] = await context.db.query(
                `SELECT * FROM message ORDER BY created_at DESC`
            );
            return messages;
        },

        articles: async (obj, args, context, info) => {
            const [articles] = await context.db.query(
                `SELECT * FROM news`
            );
            return articles;
        },

        article: async (obj, args, context, info) => {
            const [articles] = await context.db.query(
                `SELECT * FROM news WHERE id = ?`,
                [args.id]
            );
            return articles[0];
        }
    },
    Mutation: {
        createMessage: async (obj, args, context, info) => {
            const [result] = await context.db.execute(`
                INSERT INTO message (estate_id, firstname, lastname, address, postalcode, city, phonenumber, email, content, information, visit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [args.estate_id, args.firstname, args.lastname, args.address, args.postalcode, args.city, args.phonenumber, args.email, args.content, args.information, args.visit]
            );
            
            const newMessage = result.insertId;

            const [messages] = await context.db.query(
                `SELECT * from message WHERE id = ?`, [newMessage]
            )
            return messages[0];
        }
    }
}

const connection = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

function createLambdaServer () {
    return new ApolloServerLambda({
        typeDefs, 
        resolvers,
        context: {
            db: connection
        },
        introspection: true,
        playground: true,
    });
  };
  
  function createLocalServer () {
    return new ApolloServer({
        typeDefs, 
        resolvers,
        context: {
            db: connection
        },
        introspection: true,
        playground: true,
    });
  };
  
  module.exports = { createLambdaServer, createLocalServer };