import { allMessages } from '../tools/queries.js';

export const renderMessages = async () => {  
    let { messages } = await allMessages();

    for(let message of messages) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${message.firstname}</td>
            <td>${message.lastname}</td>
            <td>${message.address}</td>
            <td>${message.postalcode}</td>
            <td>${message.city}</td>
            <td>${message.phonenumber}</td>
            <td>${message.email}</td>
            <td>${message.content}</td>
            <td>${message.information ? 'Infos senden' : 'Keine Infos senden'}</td>
            <td>${message.visit ? 'Besichtigung' : 'Keine Besichtigung'}</td>
            <td>ID: ${message.estate_id} <a href="../objekt.html?id=${message.estate_id}" target="_blank" rel="noopener">Link</a></td>
            <td>${message.created_at}</td>
        `;

        document.querySelector('.messages').appendChild(row);
    };
};