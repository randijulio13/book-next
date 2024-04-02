import sweetalert from "sweetalert2";

const swal = sweetalert.mixin({
  customClass: {
    confirmButton:
      "px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200",
    cancelButton:
      "px-4 py-2 bg-gray-400 text-white hover:bg-gray-500 duration-200",
  },
  buttonsStyling: false,
  reverseButtons: true,
});

export default swal;
