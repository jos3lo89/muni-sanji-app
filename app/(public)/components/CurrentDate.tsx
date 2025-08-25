const CurrentDate = () => {
  const date = new Date();

  const currentDate = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  }).format(date);

  return (
    <span className="text-sm font-medium text-muted-foreground">
      {currentDate}
    </span>
  );
};
export default CurrentDate;
