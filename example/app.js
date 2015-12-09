import { createCallback, configure } from '../src/index';

var app = document.createElement('div');
app.innerHTML = 'GERT';
document.body.appendChild(app);

const asyncButton = document.createElement('button');
asyncButton.innerHTML = 'Facebook send';

asyncButton.setAttribute('data-title', 'BuboBox');
asyncButton.setAttribute('data-description', 'BuboBox helps you.');
asyncButton.setAttribute('data-url', 'http://bubobox.com');

asyncButton.addEventListener('click', createCallback('facebookSend'));

configure({
    facebook: { appId: 285649171457814, locale: 'nl_BE' }
}).then(() => {
    app.appendChild(asyncButton);
})

const regularButton = document.createElement('button');
regularButton.innerHTML = 'Facebook share';
regularButton.addEventListener('click', createCallback('facebookShare', {
    title: 'BuboBox',
    description: 'BuboBox helps you.',
    url: 'http://bubobox.com'
}));
app.appendChild(regularButton);
