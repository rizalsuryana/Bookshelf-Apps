function addBook(){ //deklarasi
    const judulBuku = document.querySelector('#inputBookTitle').value;
    const penulis = document.querySelector('#inputBookAuthor').value;
    const tahunTerbit = document.querySelector('#inputBookYear').value;
    const isComplete = document.querySelector('#inputBookIsComplete');

    let statusBook; //mengecek cekbox
    if(isComplete.checked){
        statusBook = true; // jiksa statusbox di ceklis akan bernilai true
    } else {
        statusBook = false; // jika tidak akan bernilai false
    }

    const membuatId = menambhkanID(); // menambahkan id
    const bookDetails = detailOfBooks(membuatId, judulBuku, penulis, tahunTerbit, statusBook);
    books.push(bookDetails);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

// fungsi untuk membuatId   yang akan di tambahakan
function menambhkanID(){
    return +new Date();
}

document.addEventListener('DOMContentLoaded', function(){
    const formBuku = document.querySelector('#inputBook');

    formBuku.addEventListener('submit', function (event){
        event.preventDefault();
        addBook();
    });
    getDataStorage();
});

function detailOfBooks(id, title, author, year, isComplete){
    return{
        id,
        title,
        author,
        year,
        isComplete
    };
}

//membuat array
const books = [];
const key = 'STORAGE-KEY';
const RENDER_EVENT = 'render-book';

document.addEventListener(RENDER_EVENT, function(){
    const belumSelsaiDibaca = document.querySelector('#incompleteBookshelfList');
    const sudahSelsaiDibaca = document.querySelector('#completeBookshelfList');

    belumSelsaiDibaca.innerHTML = '';
    sudahSelsaiDibaca.innerHTML = '';

    for(const bookItem of books){
        const bookElement = createDetailBooks(bookItem);
        if(bookItem.isComplete){
            sudahSelsaiDibaca.append(bookElement);
        }
        else{
            belumSelsaiDibaca.append(bookElement);
        }
    }
});

function saveBook(){
    localStorage.setItem(key, JSON.stringify(books));
}

function getDataStorage(){
    let datas = JSON.parse(localStorage.getItem(key));

    if(datas != null){
        for(const book of datas){
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// Menampilkan detail
function createDetailBooks(bookDetails){
    const {
        id,
        title,
        author,
        year,
        isComplete
    } = bookDetails;


    const judul = document.createElement('p');
    judul.innerHTML ='<b>Judul</b> : ' +title;


    const penulis = document.createElement('p');
    penulis.innerHTML = '<b>Penulis</b> : ' + author;


    const tahun = document.createElement('p');
    tahun.innerHTML = '<b>Tahun</b> : ' + year;

    const status =  document.createElement('p');
    if (isComplete === true){
        status.innerHTML = '<b>Status</b> : Selsai dibaca'
    }
    else{
        status.innerHTML = '<b>Status</b> : Belum Selsai dibacaa'
    }

    const box = document.createElement('article');
    box.classList.add('book_item');
    box.append(judul, penulis, tahun, status);

    if(isComplete === false){

        const doneButton = document.createElement('button');
        doneButton.classList.add('green');
        doneButton.innerText = 'Selesai dibaca';
        doneButton.addEventListener('click', function(){

            konfirmasiDone = confirm("Tandai Sebagai Sudah Selsai Dibaca?");
            if (konfirmasiDone == true){
                doneToRead(id);
                alert('Berhasil ditandai selsai dibaca');

             }
                else{
                    return false;
                }
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = 'Hapus buku';
        deleteButton.addEventListener('click', function(){

            konfirmasiDelete = confirm("Yakin Ingin menghapus Data?");
            
            if (konfirmasiDelete == true){
                bookToDelete(id);

             }
                else{
                    return false;
                }
        });

        const editButtonJudul = document.createElement('button');
        editButtonJudul.classList.add('editJudul');
        editButtonJudul.innerText = 'Edit Judul';
        editButtonJudul.addEventListener('click', function(){
            konfirmasiEdit = confirm("Ingin Mengganti Judul ?");
            if (konfirmasiEdit == true){
                editActionJudul(id);

             }
                else{
                    return false;
                }
        });

        const editButtonPenulis = document.createElement('button');
        editButtonPenulis.classList.add('editPenulis');
        editButtonPenulis.innerText = 'Edit Penulis';
        editButtonPenulis.addEventListener('click', function(){
            konfirmasiEdit = confirm("Ingin Mengganti Penulis ?");
            if (konfirmasiEdit == true){
                editActionPenulis(id);

             }
                else{
                    return false;
                }
        });


        const actionBox = document.createElement('div');
        actionBox.classList.add('action');
        actionBox.append(doneButton, deleteButton, editButtonJudul, editButtonPenulis);

 
        box.append(actionBox);
    } else {

        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerText = 'Belum Selsai';
        undoButton.addEventListener('click', function(){

            konfirmasiDone = confirm("Tandai Sebagai Belum Selsai Dibaca?");
            if (konfirmasiDone == true){
                undoAction(id);
                alert('Berhasil ditandai Belum Selsai dibaca');

             }
                else{
                    return false;
                }
        });
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = 'Hapus buku';
        deleteButton.addEventListener('click', function(){
            
            konfirmasiDelete = confirm("Yakin Ingin menghapus Data?");
            if (konfirmasiDelete == true){
                bookToDelete(id);
             }
                else{
                    return false;
                }
        });

        const editButtonJudul = document.createElement('button');
        editButtonJudul.classList.add('editJudul');
        editButtonJudul.innerText = 'Edit Judul';
        editButtonJudul.addEventListener('click', function(){
            konfirmasiEdit = confirm("Ingin Mengganti Judul ?");
            if (konfirmasiEdit == true){
                editActionJudul(id);

             }
                else{
                    return false;
                }
        });

        const editButtonPenulis = document.createElement('button');
        editButtonPenulis.classList.add('editPenulis');
        editButtonPenulis.innerText = 'Edit Penulis';
        editButtonPenulis.addEventListener('click', function(){
            konfirmasiEdit = confirm("Ingin Mengganti Penulis ?");
            if (konfirmasiEdit == true){
                editActionPenulis(id);

             }
                else{
                    return false;
                }
        });

        const actionBox = document.createElement('div');
        actionBox.classList.add('action');
        actionBox.append(undoButton, deleteButton, editButtonJudul, editButtonPenulis);


        box.append(actionBox);
    }
    
    return box;
}

function findBook(bookId){
    for(const bookItem of books){
        if(bookItem.id === bookId){
            return bookItem;
        }
    }
    return null;
}
function deleteIndexOfBooks(bookId){
    for(const index in books){
        if(books[index].id === bookId){
            return index;
        }
    }
    return -1;
}
function doneToRead(bookId){
    const rakBuku = findBook(bookId);

    if (rakBuku == null) return;

    rakBuku.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

function bookToDelete(bookId){
    const rakBuku = deleteIndexOfBooks(bookId);

    if (rakBuku === -1) return;

    books.splice(rakBuku, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
    alert('Data  Berhasil Dihapus');
}


function undoAction(bookId){
    const rakBuku = findBook(bookId);

    if (rakBuku == null) return;

    rakBuku.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

function editActionJudul(bookId){
    const rakBuku = findBook(bookId);
    if (rakBuku == null) return;
    const newTitle = prompt('Judul Baru : ');

    if (newTitle ==  null){ //untuk mwnghindari judul menjadi null ketika user batal mengedit judul
        return;
    }
    else{
        rakBuku.title = newTitle;
        alert('Judul Berhasil  Di Ganti');
    }
    bookDetails = createDetailBooks(rakBuku.id, rakBuku.title, rakBuku.author, rakBuku.year, rakBuku.isComplete);
    createDetailBooks(rakBuku);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
    
}

function editActionPenulis(bookId){
    const rakBuku = findBook(bookId);
    if (rakBuku == null) return;
    const newAuthor = prompt('Nama Penulis : ');

    if (newAuthor ==  null){ // mengindari penulis menjadi null ketika user batal mengedit
        return;
    }
    else{
        rakBuku.author = newAuthor;
        alert('Penulis Berhasil Di Ganti');
    }
    bookDetails = createDetailBooks(rakBuku.id, rakBuku.title, rakBuku.author, rakBuku.year, rakBuku.isComplete);
    createDetailBooks(rakBuku);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
    
}