(function () {
    
    const btnsComprarLibro = document.querySelectorAll(".btnComprarLibro");

    let isbnLibroSeleccionado = null;
    const csrf_token = document.querySelector("[name='csrf-token']").value;

    btnsComprarLibro.forEach((btn) => {
        btn.addEventListener('click', function () {
            isbnLibroSeleccionado = this.id;
            confirmarComprar(); 
        });
    });

    const confirmarComprar = () => {
        Swal.fire({
            title: "Confirmar la compra de libro seleccionado?",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Comprar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                                // http://127.0.0.1:5000/comprarLibro
                return await fetch(`${window.origin}/comprarLibro`, {
                    method: "POST",
                    mode: "same-origin",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrf_token
                    },
                    body: JSON.stringify({
                        "isbn": isbnLibroSeleccionado
                    })
                }).then(response => {
                    if(!response.ok) {
                        notificacionSwal("Error", response.statusText, "error", "Cerrar");
                    }
                    return response.json();
                }).then(data => {
                    if(data.exito){
                        notificacionSwal("¡Éxito!", "Libro Comprado", "success", "¡Ok!");
                    }else{
                        notificacionSwal("¡Alerta!", data.mensaje, "warning", "Ok");
                    }
                }).catch(error => {
                    notificacionSwal("Error", error, "error", "Cerrar");
                });
            },
            allowOutSideClick: () => false,
            allowEscapeKey: () => false
        }); 
    };

})();