INSERT INTO partType (partType) VALUES ("Detail");
INSERT INTO partType (partType) VALUES ("Assembly");
INSERT INTO partType (partType) VALUES ("Module");

INSERT INTO complexity (complexity) VALUES ("Simple");
INSERT INTO complexity (complexity) VALUES ("Average");
INSERT INTO complexity (complexity) VALUES ("Complex");

INSERT INTO change (changeNumber) VALUES ("ELRE123");
INSERT INTO change (changeNumber) VALUES ("CAR123");

INSERT INTO part (changeId, partNumber, partTypeId, complexityId)
   VALUES (1, "141T1000-1", 1, 1);
INSERT INTO part (changeId, partNumber, partTypeId, complexityId)
   VALUES (1, "141T1000-2", 1, 1);

INSERT INTO part (changeId, partNumber, partTypeId, complexityId)
   VALUES (2, "141T1000-3", 2, 2);
INSERT INTO part (changeId, partNumber, partTypeId, complexityId)
   VALUES (2, "141T1000-4", 1, 3);