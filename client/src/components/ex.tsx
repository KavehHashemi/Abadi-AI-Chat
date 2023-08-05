const ex = () => {
  const url = "http://127.0.0.1:4001/ex";

  const get = async () => {
    const res = await fetch(url);
    console.log(res);
  };
  get();

  return <div>{}</div>;
};

export default ex;
