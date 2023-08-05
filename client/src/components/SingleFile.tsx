type props = {
  name: string;
};
const SingleFile = ({ name }: props) => {
  return (
    <div>
      <div>{name}</div>
      {/* <img src={src}></img> */}
    </div>
  );
};
export default SingleFile;
