//*****************************************************************************
//	 LCD TV LABORATORY, LG ELECTRONICS INC., SEOUL, KOREA
//	 Copyright(c) 2010 by LG Electronics Inc.
//
//	 All rights reserved. No part of this work may be reproduced, stored in a
//	 retrieval system, or transmitted by any means without prior written
//	 permission of LG Electronics Inc.
//
//	 Following functions are for NetCast Test Suite.
//	 
//*****************************************************************************

var eventHandlerArray = new Array();
var bFirst = true;
var arrayHighlightItem = new Array();

function highlightItem(id, cssText)
{
	this.id = id;
	this.cssText = cssText;
}

function setHighlight(id)
{
	var item = document.getElementById(id);
	arrayHighlightItem.push(new highlightItem(id, item.style.cssText));
	item.setAttribute("style", item.style.cssText + "; background-color : #FF5050;");
}

function clearHighlight()
{
	var item;
	while(arrayHighlightItem.length > 0)
	{
		item = arrayHighlightItem.pop();
		if(item.cssText)
		{
			document.getElementById(item.id).style.cssText = item.cssText;
		}
		else
		{
			document.getElementById(item.id).removeAttribute("style");
		}
		
	}
}

function RequestParam(valuename)	// return the parameter of request URI
{
	var rtnval = "";
	var nowAddress = unescape(location.href);
	var parameters = (nowAddress.slice(nowAddress.indexOf("?")+1,nowAddress.length)).split("&");
   
	for(var i = 0 ; i < parameters.length ; i++){
		var varName = parameters[i].split("=")[0];
		if(varName.toUpperCase() == valuename.toUpperCase())
		{
			rtnval = parameters[i].split("=")[1];
			break;
		}
	}
	return rtnval;
}

function getKeyCode(event)
{
	var keyCode = "";
	if(window.event)	// IE
	{
		keyCode = event.keyCode;
	}
	else if(event.which)	// Netscape/Firefox/Opera
	{
		keyCode = event.which;
	}
	
	return keyCode;
}

//event-adding function for cross browser
function addEventHandler(obj, eventName, handler)
{
	//store adding events to use when confirm div is shown
	eventHandlerArray[eventHandlerArray.length] = [obj, eventName, handler];
	addEventHandlerWithOutSaving(obj, eventName, handler);
	
}

//event-adding function for cross browser
function addEventHandlerWithOutSaving(obj, eventName, handler)
{
	if(document.attachEvent)
	{
		obj.attachEvent("on" + eventName, handler);
	}
	else if(document.addEventListener)
	{
		obj.addEventListener(eventName, handler, false);
	}
}

//event-removing function for cross browser
function removeEventHandler(obj, eventName, handler)
{
	if(document.detachEvent)
	{
		obj.detachEvent("on" + eventName, handler);
	}
	else if(document.removeEventListener)
	{
		obj.removeEventListener(eventName, handler, false);
	}
}

//get active object function for cross browser
function getActivatedObject(e)
{
	var obj;
	if(!e)
	{
		obj = window.event.srcElement; //old explorer
	}
	else if(e.srcElement)
	{
		obj = e.srcElement; //ie7 or later
	}
	else
	{
		obj = e.target; //dom level 2
	}

	return obj;
}

function showPopupNotification(strNotification)
{
	var popupNotification = document.createElement("div");
	popupNotification.className = "popupNotification";
	popupNotification.id = "popupNotification";
	
	popupNotification.innerHTML = strNotification;
	popupNotification.innerHTML += '<br><br><input type="button" class="normalButton" height="30px" width="60px" onclick="closePopupNotification();" value="�뺤씤">';
	
	document.body.appendChild(popupNotification);
	
	//	move to center
	popupNotification.style.top = Math.round(window.innerHeight - popupNotification.offsetHeight)/2 + "px";
	popupNotification.style.left = Math.round(window.innerWidth - popupNotification.offsetWidth)/2 + "px";
}

function closePopupNotification()
{
	var popupNotification = document.getElementById("popupNotification");
	document.body.removeChild(popupNotification);
}

function clearTestButton()
{
	var testButtonArea = document.getElementById("testButtonArea");
	testButtonArea.innerHTML = "";
}

function addTestButton(strName, handler, bLongTitle)
{
	var testButtonDiv = document.createElement("div");
	if(bLongTitle)
	{
		testButtonDiv.className = "testButtonDivLong";
	}
	else
	{
		testButtonDiv.className = "testButtonDiv";
	}
	
	var testButton = document.createElement("input");
	if(parseInt(strName) == 0) testButton.id = "selected";
	else testButton.id = parseInt(strName)+"_button";
	
	testButton.type = "button";
	testButton.value = strName;
	testButton.onclick = handler;
	
	if(bLongTitle)
	{
		testButton.className = "testButtonLong";
	}
	else
	{
		testButton.className = "testButton";
	}
	
	testButtonDiv.appendChild(testButton);

	var testButtonArea = document.getElementById("testButtonArea");
	testButtonArea.appendChild(testButtonDiv);
}

function setTestButtonDisabled(strName, bDisable)
{
	document.getElementById(strName).disabled = bDisable;
}

function clearDescription(targetDesc)
{
	if(targetDesc != "Error")
	{
		var descNormalCaseArea = document.getElementById("descNormalCaseArea");
		descNormalCaseArea.innerHTML = "";
	}

	if(targetDesc != "Normal")
	{
		var descErrorCaseArea = document.getElementById("descErrorCaseArea");
		descErrorCaseArea.innerHTML = "";
	}
}

function addDescription(targetDesc, strDesc)
{
	if(targetDesc == "Normal")
	{
		var descNormalCaseArea = document.getElementById("descNormalCaseArea");
		descNormalCaseArea.innerHTML += strDesc + "<br>";
	}

	if(targetDesc == "Error")
	{
		var descErrorCaseArea = document.getElementById("descErrorCaseArea");
		descErrorCaseArea.innerHTML += strDesc + "<br>";
	}
}

function addMenuButton(strName, handler)
{
	var menuButtonDiv = document.createElement("div");
	menuButtonDiv.className = "buttonDescription";
	menuButtonDiv.onclick = handler;
	menuButtonDiv.id = strName;
	
	menuButtonDiv.innerHTML = strName;

	var buttonArea = document.getElementById("buttonArea");
	buttonArea.appendChild(menuButtonDiv);
}

function clearMenuButton()
{
	var buttonArea = document.getElementById("buttonArea");
	buttonArea.innerHTML = "";
}

function setMenuButtonDisabled(strName, bDisable)
{
	document.getElementById(strName).disabled = bDisable;
}

function goList()
{
	window.location.replace("../menu.html");
}

function closeApp()
{
	window.NetCastBack();
}

//	outputView <-> fullScreenContent (including contents)
function switchScreen()
{
	var fullScreenContent = document.getElementById("fullScreenContent");	
	var outputView = document.getElementById("outputView");
	var contents;
	
	if(fullScreenContent.style.visibility == "visible")
	{
		//	fullScreenContent -> outputView
		contents = fullScreenContent.innerHTML;
		fullScreenContent.innerHTML = "";
		hideFullScreen();
		
		outputView.innerHTML = contents;
	}
	else
	{
		//	outputView -> fullScreenContent
		contents = outputView.innerHTML;
		outputView.innerHTML = "";
		showFullScreen();
		
		fullScreenContent.innerHTML = contents;
	}
}

function showFullScreen()
{
	var mainBody = document.getElementById("mainBody");
	var fullScreenContent = document.getElementById("fullScreenContent");
	
	mainBody.style.opacity = 0.7;
	fullScreenContent.style.visibility = "visible";
	
	var strNotification = "Full Screen Test瑜� �꾪빐 Full Screen�� 湲곕낯 �붾㈃ �꾩뿉 Overlay�⑸땲��.";
	strNotification += "<br>�� �붾㈃�� 寃뱀퀜�� �섏삤�� 寃껋� �뚯뒪�몃� �꾪븳 寃껋씠吏� TV�� �ㅻ룞�묒씠 �꾨떃�덈떎.";
	showPopupNotification(strNotification);
}

function hideFullScreen()
{
	var mainBody = document.getElementById("mainBody");
	var fullScreenContent = document.getElementById("fullScreenContent");
	
	mainBody.style.opacity = 1;
	mainBody.style.visibility = "visible";
	fullScreenContent.style.visibility = "hidden";
	
	var bottomArea = document.getElementById("bottomArea");
		
	bottomArea.style.visibility = "";
}

function showFullScreenOnly(bShowButtonArea)
{
	var mainBody = document.getElementById("mainBody");
	var fullScreenContent = document.getElementById("fullScreenContent");

	mainBody.style.visibility = "hidden";
	fullScreenContent.style.visibility = "visible";
	
	if(bShowButtonArea === true)
	{
		var bottomArea = document.getElementById("bottomArea");

		bottomArea.style.visibility = "visible";
	}
}

function updateMouseInfo(event)
{
	var mouseInfo = document.getElementById("mouseInfo");
	mouseInfo.innerHTML = "(" + event.clientX + ", " + event.clientY + ")";
}

function initMouseMoveEvent()
{
	if(document.getElementById("mouseInfo"))
	{
		addEventListener("mousemove", updateMouseInfo, true);
	}
}

addEventListener("load", initMouseMoveEvent, true);

	function setSelectedButton(cnt) {
        console.log("setSelectedButton");
		var selectedButton = document.querySelector('[selected=true]');
		var menuList = document.querySelectorAll("[type=button]");
        var selectedButtonIndex = 0;
        if(selectedButton) {		
            selectedButtonIndex = parseInt(selectedButton.id);
        }
        var indextobemoved = selectedButtonIndex + cnt;
        
        if(indextobemoved > 2) {
            indextobemoved = 2;
        }
        if(indextobemoved < 1) {
            indextobemoved = 1;
        }
        
        console.log("currentindex : " + selectedButtonIndex);
        console.log("indextobemoved : " + indextobemoved);
        indextobemoved--;
		menuList[indextobemoved].focus();
        menuList[indextobemoved].setAttribute("selected", true);
        for(var index = 0 ; index < menuList.length; index++) {
            if(indextobemoved == index) 
                continue;
            menuList[index].setAttribute("selected", false);
        }
	};

	function remoteKeyEvent(event) {
        console.log("remoteKeyEvent");
		var inputKeyCode = getKeyCode(event);
		var menuList = document.querySelectorAll("[type=button]");
		switch(inputKeyCode) {
			case VK_BACK : window.history.back();
				break;
			case VK_UP : 
			case VK_LEFT : setSelectedButton(-1);
				break;
			case VK_DOWN : 
			case VK_RIGHT : setSelectedButton(+1);
				break;
			case VK_ENTER : executeSelectedButton();
				break;
			default :
				if((VK_0 <= inputKeyCode) && (VK_9 >= inputKeyCode))
				{
					menuList[inputKeyCode-VK_0].onclick();
					return;
				}
				break;
		}
	};
