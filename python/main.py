# generate randomized data

# Date Column :: Populate this column with dates between 10/1/05 – 10/30/05
# Rater Column :: Populate this column with Rater IDs denoted as a single letter (A, B, C, D, E)
# Correct Answers 3 Label :: Populate column with one of the labels: Low, Average, High
# Correct Answer 5 Label :: Populate column with one of the labels: Bad, Okay, Intermediate, Great,
# Exceptional
# Rater Answers 3 Label :: Populate column with one of the labels: Low, Average, High
# Rater Answers 5 Label :: Populate column with one of the labels: Bad, Okay, Intermediate, Great,
# Exceptional
# Task ID: Generate numbers 1-10000
import datetime
import random
import pandas as pd

icount = 1
data={
    "task_id": [],  
    "date":[],
    "rater":[],
    "correct_answer_3":[],
    "correct_answer_5":[],
    "rater_answer_3":[],
    "rater_answer_5":[],
    "rater_correct_3":[],
    "rater_correct_5":[],

}
rater_ids= "ABCDE"
answer3 = ["Low", "Average", "High"]
answer5 = ["Bad", "Okay", "Intermediate", "Great", "Exceptional"]
# print(data["task_id"])
random_task_id_arr = [*range(1,10001,1)]
# print(len(random_task_id_arr)-1)
while icount <= 10000:
  
  # must be random
  length = len(random_task_id_arr)
  ran_num = random.randrange(0,length,1)
  task_id = random_task_id_arr[ran_num]
  data["task_id"].append(task_id)
  random_task_id_arr.remove(random_task_id_arr[ran_num])

  # setting up random date
  r_date = datetime.datetime(2005, 10, random.randrange(1,31,1))
  random_date = datetime.datetime.strftime(r_date,'%d/%m/%Y')
  data["date"].append(str(random_date))
  data["rater"].append(random.choice(rater_ids))
  data["correct_answer_3"].append(answer3[random.randrange(0,3,1)])
  data["correct_answer_5"].append(answer5[random.randrange(0,5,1)])
  data["rater_answer_3"].append(answer3[random.randrange(0,3,1)])
  data["rater_answer_5"].append(answer5[random.randrange(0,5,1)])

  # if the correct answer == the rater answer return true else flase
  correct = True if data["correct_answer_3"][len(data["correct_answer_3"])-1]==data["rater_answer_3"][len(data["rater_answer_3"])-1] else False
  data['rater_correct_3'].append(correct)
  correct = True if data["correct_answer_5"][len(data["correct_answer_5"])-1]==data["rater_answer_5"][len(data["rater_answer_5"])-1] else False
  data['rater_correct_5'].append(correct)
  icount+=1

# print(data)



df = pd.DataFrame.from_dict(data)
print(df)

# send df to .csv 
df.to_csv('out.csv', index=False)  
          