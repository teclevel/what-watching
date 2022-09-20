function ButtonShowMore({ ...props }): JSX.Element {
  return (
    <div className="catalog__more">
      <button
        {...props}
        className="catalog__button"
        type="button"
      >Show more
      </button>
    </div>
  );
}

export default ButtonShowMore;
