import axios from 'axios';

let cats;

const catDiv = document.querySelector('#cats');

const renderCats = (cats) => {
  const html = `${cats
    .map((cat) => {
      return `
      <li>
        <h3>${cat.name}</h3>
        <img src="./assets/images/${cat.image}">
        <div>
          ${cat.sex} <i class="fas fa-paw"></i> ${cat.age}
        </div>
        <div>
          ${cat.color} <i class="fas fa-paw"></i> ${cat.hairLength}
        </div>
        <div>
          ${
            cat.familyId !== null
              ? `
            <div>
              Family: ${cat.family.name}
            </div>
          `
              : ''
          }
        </div>
        <div>
        ${
          cat.pairId !== null
            ? `
          <div>
            Adopt With: ${cat.pair.name}
          </div>
        `
            : ''
        }
        </div>
      </li>`;
    })
    .join('')}`;
  catDiv.innerHTML = html;
};

const init = async () => {
  cats = (await axios.get('/api/cats')).data;
  renderCats(cats);
};

init();
