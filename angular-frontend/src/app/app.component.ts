import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from './services/producto.service';
import { Producto } from './models/producto.model';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productos: Producto[] = [];
  productoForm: Producto = { nombre: '', descripcion: '', precio: 0, stock: 0 };
  editando = false;
  editId: number | null = null;
  mensaje = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  guardar(): void {
    if (this.editando && this.editId !== null) {
      this.productoService.actualizarProducto(this.editId, this.productoForm).subscribe({
        next: () => { this.mensaje = 'Producto actualizado'; this.resetForm(); this.cargarProductos(); }
      });
    } else {
      this.productoService.crearProducto(this.productoForm).subscribe({
        next: () => { this.mensaje = 'Producto creado'; this.resetForm(); this.cargarProductos(); }
      });
    }
  }

  editar(p: Producto): void {
    this.productoForm = { ...p };
    this.editando = true;
    this.editId = p.id!;
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => { this.mensaje = 'Producto eliminado'; this.cargarProductos(); }
      });
    }
  }

  resetForm(): void {
    this.productoForm = { nombre: '', descripcion: '', precio: 0, stock: 0 };
    this.editando = false;
    this.editId = null;
  }
}