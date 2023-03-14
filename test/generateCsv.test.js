import generateCsv from './../src/generateCsv';

describe('generateCsv utility', () => {
    it('exists', () => {
        expect(typeof generateCsv).toBe('function');
    });

    it('converts data array to CSV', () => {
      let data = [
        {
          name: 'Michael Schumacher',
          titles: 7,
          seasons: '1994, 1995, 2000, 2001, 2002, 2003, 2004',
        },
        {
          name: 'Lewis Hamilton',
          titles: 7,
          seasons: '2008, 2014, 2015, 2017, 2018, 2019, 2020',
        },
        {
          name: 'Juan Manuel Fangio',
          titles: 5,
          seasons: '1951, 1954, 1955, 1956, 1957',
        },
        {
          name: 'Alain Prost',
          titles: 4,
          seasons: '1985, 1986, 1989, 1993',
        },
        {
          name: 'Sebastian Vettel',
          titles: 4,
          seasons: '2010, 2011, 2012, 2013',
        },
        {
          name: 'Jack Brabham',
          titles: 3,
          seasons: '1959, 1960, 1966',
        },
        {
          name: 'Jackie Stewart',
          titles: 3,
          seasons: '1969, 1971, 1973',
        },
        {
          name: 'Niki Lauda',
          titles: 3,
          seasons: '1975, 1977, 1984',
        },
        {
          name: 'Nelson Piquet',
          titles: 3,
          seasons: '1981, 1983, 1987',
        },
        {
          name: 'Ayrton Senna',
          titles: 3,
          seasons: '1988, 1990, 1991',
        }
      ];

      let csv = generateCsv(data);
      let expected = `name,titles,seasons\r\n"Michael Schumacher",7,"1994, 1995, 2000, 2001, 2002, 2003, 2004"\r\n"Lewis Hamilton",7,"2008, 2014, 2015, 2017, 2018, 2019, 2020"\r\n"Juan Manuel Fangio",5,"1951, 1954, 1955, 1956, 1957"\r\n"Alain Prost",4,"1985, 1986, 1989, 1993"\r\n"Sebastian Vettel",4,"2010, 2011, 2012, 2013"\r\n"Jack Brabham",3,"1959, 1960, 1966"\r\n"Jackie Stewart",3,"1969, 1971, 1973"\r\n"Niki Lauda",3,"1975, 1977, 1984"\r\n"Nelson Piquet",3,"1981, 1983, 1987"\r\n"Ayrton Senna",3,"1988, 1990, 1991"`;

      expect(csv).toBe(expected);
    });
});
