const mockUsers = [
  {
    username: 'user1',
    password: 'user1password'
  }
];

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => {
        return u.username === username && u.password === password;
      });

      if (user) {
        resolve(`${user.username}--token`);
      } else {
        reject('User not found or password is incorrect');
      }
    }, 2000);
  });
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
}

export const clearToken = () => {
  localStorage.removeItem('token');
}

export const saveFriendlyName = (username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Saved: ${username}`);
      resolve();
    }, 100);
  });
}