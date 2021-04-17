const AddDataButton = () => {
  return (
    <div className="box-1 box-hover br-2 padding-5 flex flex-column w-fit-content mv-5">
      <div className="box-1-gray flex">
        <div className="br-1-gray ta-center pa-v-2 pa-h-5 inline-block bg-lg">
          DATA
        </div>
        <input placeholder="Enter Data" className="fg-4 pa-h-4"></input>
      </div>
      <button className="padding-2 mt-5 w-fit-content center pa-h-5">
        ADD DATA
      </button>
    </div>
  );
};

export default AddDataButton;
