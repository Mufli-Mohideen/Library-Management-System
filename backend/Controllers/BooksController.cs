using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public BooksController(LibraryDbContext context)
    {
        _context = context;
    }

    // GET: api/books
    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetBooks()
    {
        return _context.Books.ToList();
    }

    // GET: api/books/book id
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

    // POST: api/books
    [HttpPost]
    public ActionResult<Book> PostBook(Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();

        return CreatedAtAction("GetBook", new { id = book.Id }, book);
    }

    // PUT: api/books/book id
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

    // DELETE: api/books/5
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
