export const NotFound = ({ goBack }: any) => {
  return (
    <div>
      <h1>404</h1>
      <p>Pokemon not found</p>
      <button onClick={() => goBack()}>Go back</button>
    </div>
  );
};
