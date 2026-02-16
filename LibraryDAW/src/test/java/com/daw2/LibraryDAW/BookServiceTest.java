package com.daw2.LibraryDAW; // Ajustado a tu estructura de carpetas

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.daw2.LibraryDAW.model.Book;
import com.daw2.LibraryDAW.repository.BookRepository;
import com.daw2.LibraryDAW.service.BookService;

class BookServiceTest {

    @Mock
    private BookRepository bookRepository; // Simula tu base de datos
    
    @InjectMocks
    private BookService bookService; // Inyecta el simulacro en tu servicio

    @BeforeEach
    void setUp() {
        // Inicializa los mocks para evitar que bookService sea null
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBook_WhenBookDoesNotExist_ShouldSaveBook() {
        // 1. Preparamos el libro con tus datos reales
        Book newBook = new Book();
        newBook.setTitle("El universo magico");
        newBook.setAuthor("Adrian Iglesias Serrano");
        newBook.setYear(2026);
        
        // Simulamos que el repositorio NO encuentra duplicados
        when(bookRepository.findByTitleAndAuthor("El universo magico", "Adrian Iglesias Serrano"))
            .thenReturn(new ArrayList<>());
        
        // Simulamos que el guardado funciona
        when(bookRepository.save(any(Book.class))).thenReturn(newBook);

        // 2. Ejecutamos tu lógica
        Book result = bookService.createBook(newBook);

        // 3. Verificamos que se ha guardado correctamente
        assertNotNull(result);
        assertEquals("El universo magico", result.getTitle());
        verify(bookRepository).save(newBook);
    }

    @Test
    void createBook_WhenBookAlreadyExists_ShouldReturnNull() {
        // 1. Preparamos un libro que ya "existe"
        Book newBook = new Book();
        newBook.setTitle("Mortadelo y Filemon");
        newBook.setAuthor("Adrian Iglesias Serrano");
        
        // Simulamos que el repositorio SÍ encuentra el libro
        when(bookRepository.findByTitleAndAuthor("Mortadelo y Filemon", "Adrian Iglesias Serrano"))
            .thenReturn(Arrays.asList(newBook));

        // 2. Ejecutamos (debe devolver null por duplicado)
        Book result = bookService.createBook(newBook);

        // 3. Verificamos que no se llamó al método save
        assertNull(result);
        verify(bookRepository, never()).save(any(Book.class));
    }
}