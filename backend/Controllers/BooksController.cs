using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;



[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public BooksController(LibraryDbContext context)
    {
        _context = context;
    }


    // GET: api/books --Retrieving All the Books--
    [HttpGet]
    public IActionResult GetBooks()
    {
        var books = _context.Books.ToList();
        return Ok(books);
    }


    // GET: api/books/book id   --Retrieving Book by ID--
    [HttpGet("{id}")]
    public ActionResult<Book> GetBook(int id)
    {
        var book = _context.Books.Find(id);

        if (book == null)
        {
            return NotFound();
        }

        return book;
    }

    // POST: api/books  --Adding a Book--
    [HttpPost]
    public IActionResult PostBook(Book book)
    {
        if (book == null)
        {
            return BadRequest("Book data is null");
        }
        _context.Books.Add(book);
        try
        {
            _context.SaveChanges();
        }
        catch (Exception ex)
        {

            return StatusCode(500, "An error occurred while saving the book. Please try again.");
        }
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }


    // PUT: api/books/book id   --Modifying a Book Detail--
    [HttpPut("{id}")]
    public IActionResult PutBook(int id, Book book)
    {
        if (id != book.Id)
        {
            return BadRequest();
        }

        _context.Entry(book).State = EntityState.Modified;
        _context.SaveChanges();

        return NoContent();
    }

    // DELETE: api/books/5  --Deleting a Book--
    [HttpDelete("{id}")]
    public ActionResult<Book> DeleteBook(int id)
    {
        var book = _context.Books.Find(id);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        _context.SaveChanges();

        return book;
    }
            

}
