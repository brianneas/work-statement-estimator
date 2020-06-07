DROP TABLE IF EXISTS change;

CREATE TABLE change (
  changeId integer PRIMARY KEY AUTOINCREMENT,
  changeNumber text NOT NULL CHECK(length(changeNumber) > 0)
);

DROP TABLE IF EXISTS partType;

CREATE TABLE partType (
   partTypeId integer PRIMARY KEY AUTOINCREMENT,
   partType text NOT NULL
);

DROP TABLE IF EXISTS complexity;

CREATE TABLE complexity (
   complexityId integer PRIMARY KEY AUTOINCREMENT,
   complexity text NOT NULL
);

DROP TABLE IF EXISTS part;

CREATE TABLE part (
   partId integer PRIMARY KEY AUTOINCREMENT,
   changeId text NOT NULL,
   partNumber integer NOT NULL,
   partTypeId integer NOT NULL,
   complexityId text NOT NULL,
   FOREIGN KEY (changeId) REFERENCES change (changeId)
      ON DELETE CASCADE ON UPDATE NO ACTION
   FOREIGN KEY (partTypeId) REFERENCES partType (partTypeId)
      ON DELETE CASCADE ON UPDATE NO ACTION
   FOREIGN KEY (complexityId) REFERENCES complexity (complexityId)
      ON DELETE CASCADE ON UPDATE NO ACTION
);
