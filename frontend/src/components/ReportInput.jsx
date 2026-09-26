function ReportInput({
  value,
  onChange
}) {

  return (

    <textarea
      value={value}
      onChange={onChange}
      placeholder="Enter safety observation..."
      maxLength={2000}
    />

  );

}


export default ReportInput;