$(document).ready(function()
{
	$("#asuten_form>input").click(function()
	{
		var text = $("#input").val()
			.replace(/\s/g, '')
			.split("\n");
		var output = "";
		try
		{
			var makeOutput = function(scale, accidental, length)
			{
				var l = "";
				if(length != 4)
				{
					l += length;
				}
				return scale + accidental + l;
			}
			var error = function(i, j, msg)
			{
				var ii = Number(i)+1;
				var jj = Number(j)+1;
				throw new Error(ii + "行目" + jj + "文字目が不正です。\n" + msg);
			}
			for(var i in text)
			{
				var scale = "";
				var accidental = ""
				var length = 4;
				for(var j in text[i])
				{
					var c = text[i][j];
					
					if(c == "ド")
					{
						output += makeOutput(scale, accidental, length);
						scale = "c";
						accidental = ""
						length = 4;
					}
					else if(c == "レ")
					{
						output += makeOutput(scale, accidental, length);
						scale = "d";
						accidental = ""
						length = 4;
					}
					else if(c == "ミ")
					{
						output += makeOutput(scale, accidental, length);
						scale = "e";
						accidental = ""
						length = 4;
					}
					else if(c == "フ")
					{
						output += makeOutput(scale, accidental, length);
						scale = "f";
						accidental = ""
						length = 4;
					}
					else if(c == "ソ")
					{
						output += makeOutput(scale, accidental, length);
						scale = "g";
						accidental = ""
						length = 4;
					}
					else if(c == "ラ")
					{
						output += makeOutput(scale, accidental, length);
						scale = "a";
						accidental = ""
						length = 4;
					}
					else if(c == "シ")
					{
						output += makeOutput(scale, accidental, length);
						scale = "b";
						accidental = ""
						length = 4;
					}
					else if(c == "・")
					{
						output += makeOutput(scale, accidental, length);
						scale = "r";
						accidental = ""
						length = 4;
					}
					else if(c == "↑")
					{
						output += makeOutput(scale, accidental, length);
						scale = ">";
						accidental = ""
						length = 4;
					}
					else if(c == "↓")
					{
						output += makeOutput(scale, accidental, length);
						scale = "<";
						accidental = ""
						length = 4;
					}
					else if(c == "ー")
					{
						if(
							(scale == '>') ||
							(scale == '<')
						)
						{
							error(i, j, "「" + scale + "」は伸ばせません。");
						}
						if(length == 1)
						{
							error(i, j, "「ー」の数が多すぎます。");
						}
						length /= 2;
					}
					else if(c == "ッ")
					{
						if(
							(scale == '>') ||
							(scale == '<')
						)
						{
							error(i, j, "「" + scale + "」は縮められません。");
						}
						length *= 2;
					}
					else if(c == "＃")
					{
						if(
							(scale == '>') ||
							(scale == '<') ||
							(scale == 'r')
						)
						{
							error(i, j, "「" + scale + "」は半音上げられません。");
						}
						accidental = "#";
					}
					else if(c == "ｂ")
					{
						if(
							(scale == '>') ||
							(scale == '<') ||
							(scale == 'r')
						)
						{
							error(i, j, "「" + scale + "」は半音下げられません。");
						}
						accidental = "-";
					}
					else if(c == "ァ")
					{
						if(scale != "f")
						{
							error(i, j, "「ァ」が「フ」の直後以外に存在します。");
						}
					}
					else
					{
						error(i, j, "使用できない文字「" + c + "」があります。");
					}
				}
				output += makeOutput(scale, accidental, length);
			}
		}
		catch(e)
		{
			output = e.message;
		}

		$("#output").val(output);
	});
});

