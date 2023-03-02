const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const bar = document.getElementById("barcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const pdfFileInput = document.getElementById("pdf-file");
  const emp_name = document.getElementById("emp_name").value;
  const job_role = document.getElementById("job_role").value;
  const emp_dep = document.getElementById("emp_dep").value;
  const emp_id = document.getElementById("emp_id").value;
  //   const size = document.getElementById("size").value;
  const size = 180;
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  if (emp_name === "" || job_role === "" || emp_dep === "") {
    alert("Enter a the required Fields");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      // JsBarcode("#barcode", emp_id, {
      //   displayValue: false,
      //   width: 8,
      // });
      generateQRCode(emp_name, job_role, emp_dep, today, size);
      setTimeout(() => {
        // const saveURL = qr.querySelector("img").src;
        // createSaveBtn(saveURL);
        // createPDF_btn();
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (name, role, department, date, size) => {
  const qrcode = new QRCode("qrcode", {
    // text: name + ", " + role + ", " + department + " ," + date,
    text: name,
    width: size,
    height: size,
    colorDark: "#89320C",
    colorLight: "#DFBA24",
    correctLevel: QRCode.CorrectLevel.H,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();

  // const open_pdf = document.getElementById("open_pdf");
  // if (open_pdf) open_pdf.remove;
};

const createSaveBtn = (saveURL) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveURL;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

// const createPDF_btn = () => {
//   const pdf_btn = document.createElement("button");
//   pdf_btn.id = "open_pdf";
//   pdf_btn.classList =
//     "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
//   pdf_btn.innerHTML = "Generate PDF ID Card";
//   document.getElementById("generated").appendChild(pdf_btn);
//   pdf_btn.setAttribute("onclick", "insertText()");
// };

// const openpdf = () => {
//   console.log("button pressed!!");
//   PDFJS.getDocument("my-pdf-file.pdf").then(function (pdf) {
// The PDF is loaded and ready to be modified
//   });
// };

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
