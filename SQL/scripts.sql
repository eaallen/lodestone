-- rater who got the most correct
SELECT rater ,COUNT(rater_correct_3)
FROM out
WHERE rater_correct_3 = true
GROUP BY rater

SELECT rater ,COUNT(rater_correct_5) FROM out WHERE rater_correct_5 = true GROUP BY rater

-- Identify raters that have completed the most Task IDs.
-- Identify raters that have completed the least Task IDs.
SELECT rater ,COUNT(task_id) FROM out GROUP BY rater

-- What is the precision for each of the 5 labels?
SELECT out.correct_answer_5 ,COUNT(out.rater_correct_5) FROM out WHERE out.rater_correct_5 = true GROUP BY out.correct_answer_5 ORDER BY out.correct_answer_5

SELECT out.correct_answer_5 ,COUNT(out.rater_correct_5) FROM out GROUP BY out.correct_answer_5 ORDER BY out.correct_answer_5

-- What is the precision for each of the 3 labels?
SELECT out.correct_answer_3 ,COUNT(out.rater_correct_3) FROM out WHERE out.rater_correct_3 = true GROUP BY out.correct_answer_3 ORDER BY out.correct_answer_3

SELECT out.correct_answer_3 ,COUNT(out.rater_correct_3) FROM out GROUP BY out.correct_answer_3 ORDER BY out.correct_answer_3


--over all agreement rate
SELECT DISTINCT
((
    SELECT COUNT(o.rater_correct_3)
    FROM out o
    WHERE o.rater_correct_3 = TRUE
)+
(
    SELECT COUNT(o.rater_correct_5)
    FROM out o
    WHERE o.rater_correct_3 = TRUE

))/((
 SELECT COUNT(o.rater_correct_5)
    FROM out o
)+
(
  SELECT COUNT(o.rater_correct_3)
    FROM out o
)) AS total_agreement
FROM out

--what is the rater amount of correct labels per day
SELECT out.date,out.rater,COUNT(out.rater_correct_3) + COUNT(out.rater_correct_5) as count
FROM out
where out.rater_correct_3 = true or out.correct_answer_5=true
GROUP BY out.date, out.rater
ORDER BY out.rater

SELECT out.date,out.rater,COUNT(out.rater_correct_3) + COUNT(out.rater_correct_5) as count FROM out where out.rater_correct_3 = true or out.correct_answer_5=true GROUP BY out.date, out.rater ORDER BY out.rater
--Agreement Rates for Each Rater on October 6

SELECT out.date,out.rater,
((
    SELECT COUNT(out.rater_correct_3)
    from out o
    WHERE o.rater = out.rater
    AND rater_correct_3 = true
)
+
(
    SELECT COUNT(out.rater_correct_5)
    from out o
    WHERE o.rater = out.rater 
    AND out.rater_correct_5 = true

))
/
((
    SELECT COUNT(out.rater_correct_3)
    from out o
    WHERE o.rater = out.rater
)+
(
    SELECT COUNT(out.rater_correct_5)
    From out o
    WHERE o.rater = out.rater
)) as Agreement_rates

FROM out
where DATE_DIFF(out.date, CAST("2005-10-6" as DATE),"day") = 0
AND out.rater_correct_3 = true or out.correct_answer_5=true
GROUP BY out.date, out.rater
ORDER BY out.rater



--test
SELECT out.date,out.rater,
COUNT(out.rater_correct_3) + COUNT(out.rater_correct_5) as count
FROM out
where DATE_DIFF(out.date, CAST("2005-10-6" as DATE),"day") = 0
AND out.rater_correct_3 = true or out.correct_answer_5=true
GROUP BY out.date, out.rater
ORDER BY out.rater