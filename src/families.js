import axios from 'axios';

let families;

const familyDiv = document.querySelector('#families');

const renderFamilies = (families) => {
  const html = `${cats
    .map((cat) => {
      return `
      <li>
        <div>
          <h2>Fluffington<h2>
          <h2>McMeow</h2>
          <h2>Pawskiy</h2>
        </div>
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
  familyDiv.innerHTML = html;
};

const init = async () => {
  families = (await axios.get('/api/families/:id')).data;
  renderFamilies(families);
};

init();
