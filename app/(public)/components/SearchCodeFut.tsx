const SearchCodeFut = () => {
  return (
    <form method="POST" action="" className="mb-4">
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Ver estado de mi FUT:</label>
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control form-control-sm"
            name="cod"
            placeholder="Código del FUT"
          />
        </div>
        <div className="col-sm-2">
          <input
            type="submit"
            className="btn btn-primary form-control-sm"
            value="Buscar"
          />
        </div>
      </div>
    </form>
  );
};
export default SearchCodeFut;
