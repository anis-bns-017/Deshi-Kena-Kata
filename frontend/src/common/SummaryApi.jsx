const backendDomain = "http://localhost:5002";

const SummaryApi = {
  getProducts: {
    url: `${backendDomain}/api/get-products`,  // ✅ Correct
    method: "get",
  },
  addProducts: {
    url: `${backendDomain}/api/add-products`,  // ✅ Correct
    method: "post",
  }
};

export default SummaryApi;