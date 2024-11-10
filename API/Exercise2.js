class User {
  constructor({ id, name, username, email, address, phone, website, company }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
  }

  display() {
    return `
      <div class="user">
        <h2>${this.name} (${this.username})</h2>
        <p>Email: ${this.email}</p>
      </div>
    `;
  }
}

class UserManager {
  constructor(users) {
    this.users = users;
  }

  displayUsers() {
    const usersContainer = document.getElementById('users-container');
    usersContainer.innerHTML = this.users.map(user => user.display()).join('');
  }

  filterUsers(searchValue) {
    const usersContainer = document.getElementById('users-container');
    const filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    usersContainer.innerHTML = filteredUsers.map(user => user.display()).join('');
  }
}

// Fetch users and initialize UserManager
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const users = data.map(userData => new User(userData));
    const userManager = new UserManager(users);
    userManager.displayUsers();

    // Attach filter function to search bar
    document.getElementById('search-bar').addEventListener('input', (event) => {
      userManager.filterUsers(event.target.value);
    });
  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));