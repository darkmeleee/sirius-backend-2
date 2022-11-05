const graphql = require("graphql");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLDate
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');
const Reader = require('../models/reader');
const Rent = require('../models/rent');

const moment = require("moment");
var given = moment("1970-01-01", "YYYY-MM-DD");
var current = moment().startOf('day');


const todayis = moment.duration(given.diff(current)).asDays();




Book.init()
Author.init()
Reader.init()
Rent.init()




const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        bookName: {
            type: GraphQLString
        },
        bookTime: {
            type: GraphQLInt
        },
        bookLink: {
            type: GraphQLString
        },
        Author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorID);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        authorName: {
            type: GraphQLString
        },
        authorPhotourl: {
            type: GraphQLString
        },
        authorBirthday: {
            type: GraphQLString
        },
        authorDeath: {
            type: GraphQLString
        },
        authorBooks: {
            type: GraphQLInt
        },

        Book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({
                    authorID: parent._id
                })
            }
        },
    })
})

const ReaderType = new GraphQLObjectType({
    name: 'Reader',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        readerName: {
            type: GraphQLString
        },
        readerEmail: {
            type: GraphQLString
        },
        readerPenalty: {
            type: GraphQLInt
        },
        Rent: {
            type: new GraphQLList(RentType),
            resolve(parent, args) {

                return Rent.find({
                    readerID: parent._id
                });
            }
        }

    })
})

const RentType = new GraphQLObjectType({
    name: 'Rent',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        Book: {
            type: BookType,
            resolve(parent, args) {
                return Book.findById(parent.bookID)
            }
        },
        Reader: {
            type: ReaderType,
            resolve(parents, args) {
                return Reader.findById(parents.readerID)
            }
        },
        rentDate: {
            type: GraphQLInt
        },
        rentPeriod: {
            type: GraphQLInt
        },
        penaltyAmount: {
            type: GraphQLInt
        },
    })
})

const Mutataion = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                bookName: {
                    type: GraphQLString
                },
                bookTime: {
                    type: GraphQLInt
                },
                bookLink: {
                    type: GraphQLString
                },
                authorID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                const book = new Book({
                    bookName: args.bookName,
                    bookTime: args.bookTime,
                    bookLink: args.bbookLink,
                    authorID: args.authorID,
                })
                book.save();
                return book;
            }
        },

        addAuthor: {
            type: AuthorType,
            args: {
                authorName: {
                    type: GraphQLString
                },
                authorPhotourl: {
                    type: GraphQLString
                },
                authorBirthday: {
                    type: GraphQLString
                },
                authorDeath: {
                    type: GraphQLString
                },
                authorBooks: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                const author = new Author({
                    authorName: args.authorName,
                    authorPhotourl: args.authorPhotourl,
                    authorBirthday: args.authorBirthday,
                    authorDeath: args.authorDeath,
                    authorBooks: args.authorBooks
                })
                author.save();
                return author;
            }
        },

        addReader: {
            type: ReaderType,
            args: {
                readerName: {
                    type: GraphQLString
                },
                readerEmail: {
                    type: GraphQLString
                },
                readerPenalty: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                const reader = new Reader({
                    readerName: args.readerName,
                    readerEmail: args.readerEmail,
                    readerPenalty: args.readerPenalty
                })
                reader.save();
                return reader;
            }
        },

        addRent: {
            type: RentType,
            args: {
                bookID: {
                    type: GraphQLString
                },
                readerID: {
                    type: GraphQLString
                },
                rentDate: {
                    type: GraphQLInt
                },
                rentPeriod: {
                    type: GraphQLInt
                },
                penaltyAmount: {
                    type: GraphQLInt
                },
            },
            resolve(parent, args) {
                const rent = new Rent({
                    bookID: args.bookID,
                    readerID: args.readerID,
                    rentDate: args.rentDate,
                    rentPeriod: args.rentPeriod,
                    penaltyAmount: args.penaltyAmount,
                })
                rent.save();
                return rent;

            }
        },



        deleteBook: {
            type: BookType,
            args: {
                bookID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Book.findByIdAndRemove(args.bookID);
            }
        },

        deleteAuthor: {
            type: AuthorType,
            args: {
                authorID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Author.findByIdAndRemove(args.authorID)
            }
        },

        deleteReader: {
            type: ReaderType,
            args: {
                readerID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Reader.findByIdAndRemove(args.readerID);
            }
        },

        deleteRent: {
            type: RentType,
            args: {
                rentID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Rent.findByIdAndRemove(args.rentID);
            }
        },

        updateBook: {
            type: BookType,
            args: {
                bookID: {
                    type: GraphQLString
                },
                bookName: {
                    type: GraphQLString
                },
                bookTime: {
                    type: GraphQLInt
                },
                bookLink: {
                    type: GraphQLString
                },
                authorID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Book.findByIdAndUpdate(args.bookID, {
                    $set: {
                    
                        bookName: args.bookName,
                        bookTime: args.bookTime,
                        bookLink: args.bookLink,
                        authoriD: args.authoriD
                    }
                }, {
                    new: true
                }, );
            }
        },

        updateAuthor: {
            type: AuthorType,
            args: {
                authorID: {
                    type: GraphQLString
                },
                authorName: {
                    type: GraphQLString
                },
                authorPhotourl: {
                    type: GraphQLString
                },
                authorBirthday: {
                    type: GraphQLString
                },
                authorDeath: {
                    type: GraphQLString
                },
                authorBooks: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return Author.findByIdAndUpdate(args.authorID, {
                    $set: {
                        authorName: args.authorName,
                        authorPhotourl: args.authorPhotourl,
                        authorBirthday: args.authorBirthday,
                        authorDeath: args.authorDeath,
                        authorBooks: args.authorBooks
                    }
                }, {
                    new: true
                }, );
            }
        },

        updateReader: {
            type: ReaderType,
            args: {
                readerID: {
                    type: GraphQLString
                },
                readerName: {
                    type: GraphQLString
                },
                readerEmail: {
                    type: GraphQLString
                },
                readerPenalty: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return Reader.findByIdAndUpdate(args.readerID, {
                    $set: {
                        readerName: args.readerName,
                        readerEmail: args.readerEmail,
                        readerPenalty: args.readerPenalty
                    }
                }, {
                    new: true
                }, );
            }
        },

        updateRent: {
            type: RentType,
            args: {
                rentID: {
                    type: GraphQLString
                },
                bookID: {
                    type: GraphQLString
                },
                readerID: {
                    type: GraphQLString
                },
                rentDate: {
                    type: GraphQLInt
                },
                rentPeriod: {
                    type: GraphQLInt
                },
                penaltyAmount: {
                    type: GraphQLInt
                },
            },
            resolve(parent, args) {
                return Rent.findByIdAndUpdate(args.rentID, {
                    $set: {
                        bookID: args.bookID,
                        readerID: args.readerID,
                        rentdate: args.rentDate,
                        rentPeriod: args.rentPeriod,
                        penaltyAmount: args.penaltyAmount
                    }
                }, {
                    new: true
                }, );

            }
        },

        rentBook: {
            type: RentType,
            args: {
                bookID: {
                    type: GraphQLString
                },
                readerID: {
                    type: GraphQLString
                },
                penaltyAmount: {
                    type: GraphQLInt
                },
            },
            resolve(parent, args) {
                Book
                    .findById(args.bookID)
                    .exec(function(err, book) {
                        if (err) {
                            console.log(err)
                        }
                        const rent = new Rent({
                            bookID: args.bookID,
                            readerID: args.readerID,
                            rentDate: todayis,
                            rentPeriod: book.bookTime,
                            penaltyAmount: args.penaltyAmount
                        })
                        rent.save();
                        return rent;

                    });
            }
        },

        returnBook: {
            type: ReaderType,
            args: {
                bookID: {
                    type: GraphQLString
                },
                readerID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                Rent
                    .findOneAndDelete({
                        bookID: args.bookID,
                        readerID: args.readerID
                    })
                    .exec(function(err, rent) {
                        Book
                            .findById(args.bookID)
                            .exec(function(err, book) {
                                var diff = todayis * -1 - rent.rentDate * -1;
                                if (diff > book.bookTime) {
                                    const diff1 = diff - book.bookTime;
                                    Reader.findOneAndUpdate({
                                        _id: args.readerID
                                    }, {
                                        $inc: {
                                            readerPenalty: diff1 * rent.penaltyAmount
                                        }
                                    }).exec(function(err, response) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        return response;
                                    })


                                } else {
                                    Reader
                                            .findById(args.readerID) 
                                            .exec(function(err,reader){
                                                return reader;
                                            })
                                }
                            })


                    });
            }
        }




    }
})




const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find();
            }
        },
        rents: {
            type: new GraphQLList(RentType),
            args: {
                readerID: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Rent.find({
                    readerID: args.readerID
                })
            }
        },
        readBook: {
            type: BookType,
            args: {
                bookId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Book.findById(args.bookId);
            }
        },
        readAuthor: {
            type: AuthorType,
            args: {
                authorId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Author.findById(args.authorId);
            }
        },
        readRent: {
            type: RentType,
            args: {
                rentId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Rent.findById(args.rentId);
            }
        },
        readReader: {
            type: ReaderType,
            args: {
                readerId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Reader.findById(args.readerId);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutataion
});
