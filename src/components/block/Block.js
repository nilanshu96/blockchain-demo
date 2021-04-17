const Block = () => {
  return (
    <div className="box-1 box-hover br-2 padding-5  w-fit-content mv-5">
      <div className="box-1-gray flex">
        <div className="br-1-gray ta-center pa-v-2 pa-h-5 inline-block bg-lg">
          DATA
        </div>
        <input placeholder="Enter Data" className="fg-4 pa-h-4"></input>
      </div>
      <div className="flex pa-t-5 pa-b-2 fs-s-8">
        <div className="pa-r-5">PREVIOUS HASH</div>
        <div className="fc-g">0</div>
      </div>
      <div className="flex  pa-b-5 pa-t-2 fs-s-8">
        <div className="pa-r-5">HASH</div>
        <div className="fc-g">
          0001805de64a4bc3c250a7f642fd7c360fb7881be2917a9eea60858e54b66629
        </div>
      </div>
      <div className="flex fs-l-5 pa-v-2 flex-baseline">
        <div className="mr-2">GENESIS BLOCK </div>
        <div className="fs-s-8"> on date</div>
        <div className="ml-a">1024</div>
      </div>
    </div>
  );
};

export default Block;
