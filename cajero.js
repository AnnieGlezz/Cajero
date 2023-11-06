var cuentas = [
      { nombre: "Persona 1", saldo: 200, password: "contrasena1" },
      { nombre: "Persona 2", saldo: 290, password: "contrasena2" },
      { nombre: "Persona 3", saldo: 67, password: "contrasena3" }
    ];

    var cuentaSeleccionada = null;

    var cuentaSelect = document.getElementById("cuenta");
    var passwordInput = document.getElementById("password");
    var mensaje = document.getElementById("mensaje");
    var opcionesSection = document.getElementById("opciones");
    var saldoSection = document.getElementById("saldo");
    var montoForm = document.getElementById("montoForm");
    var montoInput = document.getElementById("monto");
    var confirmMontoButton = document.getElementById("confirmMontoButton");

    document.getElementById("loginButton").addEventListener("click", iniciarSesion);
    document.getElementById("consultarSaldoButton").addEventListener("click", consultarSaldo);
    document.getElementById("ingresarMontoButton").addEventListener("click", mostrarFormIngresarMonto);
    document.getElementById("retirarMontoButton").addEventListener("click", mostrarFormRetirarMonto);
    confirmMontoButton.addEventListener("click", confirmarMonto);

    function iniciarSesion() {
      var cuentaIndex = cuentaSelect.value;
      var password = passwordInput.value;
      var valid = false;

      if (cuentaIndex >= 0 && cuentaIndex < cuentas.length) {
        if (password === cuentas[cuentaIndex].password) {
          cuentaSeleccionada = cuentas[cuentaIndex];
          valid = true;
        }
      }

      if (valid) {
        mostrarOpciones();
        mensaje.style.display = "none";
      } else {
        mensaje.textContent = "Credenciales incorrectas";
        mensaje.style.display = "block";
      }
    }

    function mostrarOpciones() {
      opcionesSection.style.display = "block";
      actualizarSaldo();
    }

    function consultarSaldo() {
      saldoSection.style.display = "block";
      var saldo = cuentaSeleccionada.saldo;
      saldoSection.textContent = "Saldo actual: $" + saldo;
    }

    function mostrarFormIngresarMonto() {
      montoForm.style.display = "block";
      confirmMontoButton.dataset.operation = "deposit";
    }

    function mostrarFormRetirarMonto() {
      montoForm.style.display = "block";
      confirmMontoButton.dataset.operation = "withdraw";
    }

    function confirmarMonto() {
      var monto = parseFloat(montoInput.value);

      if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto válido.");
        return;
      }

      var operation = confirmMontoButton.dataset.operation;
      if (operation === "deposit") {
        depositarMonto(monto);
      } else if (operation === "withdraw") {
        retirarMonto(monto);
      }
    }

    function depositarMonto(monto) {
        if (cuentaSeleccionada.saldo + monto>990) {
            alert("El valor máximo de la cuenta debe ser 990, por favor ingrese un valor válido")
            return;
        }
        else {cuentaSeleccionada.saldo += monto;
      actualizarSaldo();
      montoForm.style.display = "none";}
    }

    function retirarMonto(monto) {
      if (monto > cuentaSeleccionada.saldo) {
        alert("No tiene suficientes fondos para retirar esta cantidad.");
       } else if(cuentaSeleccionada.saldo + monto>990) {
            alert("El valor mínimo de la cuenta debe ser 10, por favor retire un valor válido")
            return;
      } else {
        cuentaSeleccionada.saldo -= monto;
        actualizarSaldo();
        montoForm.style.display = "none";
      } 
    }

    function actualizarSaldo() {
      var saldo = cuentaSeleccionada.saldo;
      saldoSection.textContent = "Saldo actual: $" + saldo;
    }

    function cerrarSesion() {
      cuentaSeleccionada = null;
      opcionesSection.style.display = "none";
      saldoSection.style.display = "none";
      montoForm.style.display = "none";
      mensaje.style.display = "none";
      cuentaSelect.selectedIndex = 0;
      passwordInput.value = "";
    }

    
    document.getElementById("salirButton").addEventListener("click", cerrarSesion);