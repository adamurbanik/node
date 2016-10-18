-- ********  MySQL  *******

SELECT * FROM ksiazki ORDER BY cena DESC LIMIT 1
SELECT * FROM ZAMOWIENIA WHERE status = 'wyslano'
SELECT * FROM klienci WHERE nazwisko = 'Rutkowski'
SELECT * FROM ksiazki WHERE tytul LIKE '%PHP%'
SELECT * FROM zamowienia order by data desc

SELECT kl.imie, kl.nazwisko, zam.idzamowienia, zam.data  from klienci as kl, zamowienia as zam
where kl.idklienta = zam.idklienta

select kl.imie , kl.nazwisko from klienci as kl , zamowienia as zam
where kl.idklienta = zam.idklienta
and zam.idksiazki = 2

select ks.imieautora, ks.nazwiskoautora, ks.tytul from zamowienia as zam, ksiazki as ks, klienci as kl
where (zam.idksiazki = ks.idksiazki and 
	zam.idklienta = kl.idklienta) 
and (kl.imie = 'Jan' and kl.nazwisko = 'Nowak') 

select kl.imie, kl.nazwisko, kl.idklienta, zam.data, zam.status, ks.tytul from zamowienia as zam, klienci as kl, ksiazki as ks
where zam.idklienta = kl.idklienta
and (kl.nazwisko = 'Rutkowski' 
	and zam.idksiazki = ks.idksiazki)
order by zam.data desc


-- zadanie domowe - samochody
select kl.imie, kl.naziwsko  from klienci as kl
select * from auta where rocznik = '2010'
select * from auta where auta.marka = 'Ford'
select * from auta where idauta between 2 and 4
select * from klienci where adres like '%rolna%'
select marka, model, ubezpieczenie from auta order by ubezpieczenie desc

select a.idauta, a.marka, a.model, wyp.datawyp from auta as a, wypozyczenia as wyp
where a.idauta = wyp.idauta 
order by wyp.datawyp
limit 1

select kl.imie, kl.nazwisko, a.idauta from klienci as kl, wypozyczenia as wyp, auta as a
where a.idauta = 1
and (kl.idklienta = wyp.idklienta
	and wyp.idauta = a.idauta)


select a.marka, a.model, kl.idklienta from auta as a, wypozyczenia as wyp, klienci as kl
where kl.idklienta = 4
and (wyp.idauta = a.idauta
	and wyp.idklienta - kl.idklienta)


select a.marka, a.model, kl.nazwisko from auta as a, wypozyczenia as wyp, klienci as kl
where wyp.idklienta = kl.idklienta
and kl.nazwisko = 'Pastewniak'


update klienci set nazwisko='Psikuta' where idklienta = 4
update ksiazki set cena = cena * 1.1  || update ksiazki set cena = cena + 0.1*cena
update ksiazki set cena = ROUND(cena*1.1, 2)
update ksiazki set cena = cena - 10 order by cena desc limit 1
update klienci set imie='Joanna', nazwisko='Dostojewska' where idklienta='10'
update klienci set status = 'Wyslano' where idzamowienia between 4 and 5


insert into klienci values (null, 'Franciszek', 'Janowski', 'Chorzów')
insert into zamowienia (idzamowienia, data, status, idklienta, idksiazki) values(null, '2016-01-01', 'oczekiwanie', 7, 3)
insert into ksiazki (idksiazki, nazwiskoautora, tytul) values(null, 'Grębosz', 'Symfonia')
insert into klienci values(null, 'Marilyn', 'Monroe', 'Los Angeles'), (null, 'John' , 'Wayne', 'Los Angeles')
insert into klienci set idklienta=null, imie='Steve', nazwisko='McQueen', miejscowosc='Los Angeles'




*** SQLite *****
= equals
!= not equals
> greater than
< less than
>= greater than or equal to
<= less than or equal to

SELECT * FROM celebs;

UPDATE celebs SET twitter_handle = '@taylorswift13' WHERE id = 4; 

DELETE FROM celebs WHERE twitter_handle IS NULL;

SELECT * FROM movies WHERE name LIKE 'Se_en';

SELECT * FROM movies WHERE name BETWEEN 'A' AND 'J';

SELECT * FROM movies WHERE year BETWEEN 1990 AND 2000;

select count(*) from fake_apps;

SELECT COUNT(*) FROM fake_apps WHERE price = 0;

SELECT price, COUNT(*) FROM fake_apps GROUP BY price;

select price, count(*) from fake_apps 
where downloads > 20000
group by price;

select sum(downloads) from fake_apps ;

select category, sum(downloads) from fake_apps  group by category;

select name, max(downloads) from fake_apps ;

select name , category, max(downloads) from fake_apps group by category;

select min(downloads) from fake_apps;

select name, category, min(downloads) from fake_apps group by category;

select avg(downloads) from fake_apps;

select name, avg(downloads) from fake_apps group by price;

select price , round(avg(downloads),2) from fake_apps group by price;

select price, round(avg(downloads)) from fake_apps group by price;

create table artists(id integer primary key, name text);

-- inner join -> will combine rows from different tables if the join condition is true.

SELECT
  *
FROM
  albums
JOIN artists ON
  albums.artist_id = artists.id;

-- left outer join -> will return every row in the left table, and if the join condition is not met, NULL values are used to fill in the columns from the right table.

SELECT
  *
FROM
  albums
LEFT JOIN artists ON
  albums.artist_id = artists.id;


SELECT
  albums.name AS 'Album',
  albums.year,
  artists.name AS 'Artist'
FROM
  albums
JOIN artists ON
  albums.artist_id = artists.id
WHERE
  albums.year > 1980;