function reverseStr(str)
{
    var listOfChars=str.split('');//['h','e','l',..]
    var reverseListOfChars = listOfChars.reverse();
    var reverseStr=reverseListOfChars.join('');
    return reverseStr;
//     return str.split('').reverse().join('');
}
function isPalindrome(str)
{
   var reverse=reverseStr(str);
   return str  ===  reverse;
}
function convertDateToStr(date)
{
 var dateStr={day:'',month:'',year:''};
 if(dateStr.day<10)
 {
    dateStr.day='0'+ date.day;
 }
 else{
  dateStr.day=date.day.toString();
 }
 if(dateStr.month<10)
 {
    dateStr.month='0'+ date.month;
 }
 else{
  dateStr.month=date.month.toString();
 }
 dateStr.year=date.year.toString();
 return dateStr;
}

function getAllDateFormats(date)
{
    var dateStr=convertDateToStr(date);

    var ddmmyyy =dateStr.day+dateStr.month+dateStr.year;
    var mmddyyy = dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd= dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return [ddmmyyy,mmddyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPlindromeForAllDateFormats(date)
{
    var listOfPalindromes=getAllDateFormats(date);

    var flag =false;
    for(var i=0;i<listOfPalindromes.length;i++)
    {
    if(isPalindrome(listOfPalindromes[i]))
    {
        flag = true;
        break;
    }
    }
    return flag;
}

//check for leap year
function isLeapYear(year)
{
    if(year%400)
    {
        return true;
    }

    if(year %100===0)
    {
        return true;
    }
    if(year%4===0)
    {
        return true; 
    }
    return false;
}

//gets next date
function getNextDate(date)
{
  var day = date.day+1;
  var month = date.month;
  var year =date.year;
  var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
  //0-11

  if(month===2)//check for february
  {
    //check for leap year
    if(isLeapYear(year))
    {
        if(day>29){
            day=1;
            month++;
        }
    }
    else{
        if(day>28)
        {
            day=1;
            month++;
        }
    }
    //check for leap year
  }
  //check for other months
  else{
    //check if the day exceeds the max days in month
    if(day>daysInMonth[month - 1])
    {
        day=1;
        month++;
    }
  }
//increment the year if month is greater than 12
  if(month>12)
  {
    month=1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };

}
function getNextPalindromeDate(date)
{
    var ctr = 0;
    var nextDate = getNextDate(date);
    while(1)
    {
        ctr++;
        var isPalindrome = checkPlindromeForAllDateFormats(nextDate);
        if(isPalindrome)
        {
            break;
        }
       nextDate=getNextDate(nextDate);
    }
    return[ctr,nextDate];

}

var dateInputRef=document.querySelector("#birthday-input");
var showBtnRef=document.querySelector("#show-btn");
var outputElement=document.querySelector("#result");


function clickHandler()
{
var bdayStr=dateInputRef.value;
if(bdayStr!='')
{
    var listOfDate=bdayStr.split('-');
    var date={
        day: Number(listOfDate[2]),
        month:  Number(listOfDate[1]),
        year:  Number(listOfDate[0])
    };
    var isPalindrome=checkPlindromeForAllDateFormats(date);
    if(isPalindrome)
    {
        outputElement.innerText="yay! your birthdate is a palindrome ???? ???? " }
    else
    {
        var[ctr,nextDate]=getNextPalindromeDate(date);
        outputElement.innerText=`The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr} days. ???? `;
        }
       
}
else{
    
    outputElement.innerText='please enter valid dates ????';
}
}
showBtnRef.addEventListener("click",clickHandler);