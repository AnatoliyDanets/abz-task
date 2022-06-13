const baseURL = "https://frontend-test-assignment-api.abz.agency/api/v1";
export async function getUsers(page) {
  const res = await fetch(baseURL + `/users?page=${page}&count=6`);
  const data = await res.json();
  return data;
}

export async function addUsers(data, token) {
  const res = await fetch(baseURL + "/users", {
    method: "POST",
    body: data,
    headers: {
      Token: token, // get token with GET api/v1/token method
    },
  });
  return res;
}

export const getToken = async () => {
  const res = await fetch(baseURL + `/token`);
  const token = await res.json();
  return token;
};

export const getPositions = async () => {
  const res = await fetch(baseURL + `/positions`);
  const positions = await res.json();
  return positions;
};

// export const Context = React.createContext(ApiService);
