const Filter = ({ handleSearchName }) => {
  return (
    <div>
      filter names: <input type="text" onChange={handleSearchName} />
    </div>
  );
};

export default Filter;
