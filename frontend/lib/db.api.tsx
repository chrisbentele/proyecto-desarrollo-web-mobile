export const onDelete = (selected: any) => {
  console.log("onDelete", selected);
  return Promise.all(
    selected.map((element: any) => {
      return fetch(`http://127.0.0.1:3001/books/${element}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selected),
      });
    })
  );
};

export const onEdit = (data: any) => {
  console.log("onEdit", data);
  return fetch(`http://127.0.0.1:3001/books/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const onCreate = (data: any) => {
  console.log("onCreate", data);
  return fetch("http://127.0.0.1:3001/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const onSearch = () => {
  console.log("onSearch");
  return fetch("http://127.0.0.1:3001/books")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const onGenerarPdf = () => {
  console.log("onGenerarPdf");
  return fetch("http://127.0.0.1:3001/generate-pdf")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  onDelete,
  onEdit,
  onSearch,
  onCreate,
  onGenerarPdf,
};
