import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(
  "https://diplbackendstefport.netlify.app/"
);

export const allEstates = async () => {
  const query = gql`
    query {
      estates {
        id
        title
        status
        availability
        availability_date
        city
        country
        zip
        canton
        area
        price
        type
        img_url
        imgs
        img_cdn
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getCoor = async (id) => {
  const query = gql`
        query {
            estate(id: ${id}) {
                lat
                lng
            }
        }
    `;

  return await graphQLClient.request(query);
};

export const getDetails = async (id) => {
  const query = gql`
        query {
            estate(id: ${id}) {
                title
                status
                availability
                zip
                city
                canton
                price
                area
                description
                img_url
                imgs
                img_cdn
            }
        }
    `;

  return await graphQLClient.request(query);
};

export const latestEstates = async () => {
  const query = gql`
    query {
      estates(limit: 3) {
        id
        title
        status
        availability
        availability_date
        city
        country
        zip
        canton
        area
        price
        img_url
        imgs
        img_cdn
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const sendFormData = async (formData) => {
  const mutation = gql`
    mutation (
      $estate_id: String
      $firstname: String
      $lastname: String
      $address: String
      $postalcode: String
      $city: String
      $phonenumber: String
      $email: String
      $content: String
      $information: Boolean
      $visit: Boolean
    ) {
      createMessage(
        estate_id: $estate_id
        firstname: $firstname
        lastname: $lastname
        address: $address
        postalcode: $postalcode
        city: $city
        phonenumber: $phonenumber
        email: $email
        content: $content
        information: $information
        visit: $visit
      ) {
        estate_id
        firstname
        lastname
        address
        postalcode
        city
        phonenumber
        email
        content
        information
        visit
      }
    }
  `;

  const response = await graphQLClient.request(mutation, formData);
  return response;
};

export const allMessages = async () => {
  const query = gql`
    query {
      messages {
        id
        estate_id
        firstname
        lastname
        address
        postalcode
        city
        phonenumber
        email
        content
        information
        visit
        created_at
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const articleTeaser = async () => {
  const query = gql`
    query {
      articles {
        id
        category
        publish_date
        excerpt
        img
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const article = async (id) => {
  const query = gql`
        query {
            article(id: ${id}) {
                id
                img
                title
                category
                publish_date
                full_article
            }
        }
    `;

  return await graphQLClient.request(query);
};
