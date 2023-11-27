export const onDelete = (selected: any) => {
  console.log("onDelete", selected);
};

export const onEdit = (data: any) => {
  console.log("onEdit", data);
};

export const onCreate = (data: any) => {
  console.log("onCreate", data);
};

export const onSearch = () => {
  return fetch("http://127.0.0.1:3001/books")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const onGenerarPdf = () => {
  console.log("onGenerarPdf");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  onDelete,
  onEdit,
  onCreate,
};
