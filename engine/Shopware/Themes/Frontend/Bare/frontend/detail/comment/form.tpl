{namespace name="frontend/detail/comment"}

{* Display notice if the shop owner needs to unlock a comment before it will be listed *}
{block name='frontend_detail_comment_post_notice'}
	{if {config name=VoteUnlock}}
		<div class="notice">
			{s name='DetailCommentTextReview'}{/s}
		</div>
	{/if}
{/block}

{* Review title *}
{block name='frontend_detail_comment_post_title'}
	<h2 class="content--title">
		{s name="DetailCommentHeaderWriteReview"}{/s}
	</h2>
{/block}

{* Publish review form *}
{block name='frontend_detail_comment_post_form'}
	<form method="post" action="{url action='rating' sArticle=$sArticle.articleID sCategory=$sArticle.categoryID}" class="content--form review--form">

		{* Review author name *}
		{block name='frontend_detail_comment_input_name'}
			<input name="sVoteName" type="text" value="{$sFormData.sVoteName|escape}" class="review--field{if $sErrorFlag.sVoteName} has--error{/if}" placeholder="{s name="DetailCommentLabelName"}{/s}*" />
		{/block}

		{* Reviewer eMail address *}
		{block name='frontend_detail_comment_input_mail'}
			{if {config name=OptinVote} == true}
				<input name="sVoteMail" type="email" value="{$sFormData.sVoteMail|escape}" class="review--field{if $sErrorFlag.sVoteMail} has--error{/if}" placeholder="{s name="DetailCommentLabelMail"}{/s}*" />
			{/if}
		{/block}

		{* Review summary *}
		{block name='frontend_detail_comment_input_summary'}
			<input name="sVoteSummary" type="text" value="{$sFormData.sVoteSummary|escape}" id="sVoteSummary" class="review--field{if $sErrorFlag.sVoteSummary} has--error{/if}" placeholder="{s name="DetailCommentLabelSummary"}{/s}*" />
		{/block}

		{* Review Rating *}
		{block name='frontend_detail_comment_input_rating'}
			<div class="field--select">
				<span class="arrow"></span>
				<select name="sVoteStars" class="review--field">
					<option value="10">{s name="Rate10"}{/s}</option>
					<option value="9">{s name="Rate9"}{/s}</option>
					<option value="8">{s name="Rate8"}{/s}</option>
					<option value="7">{s name="Rate7"}{/s}</option>
					<option value="6">{s name="Rate6"}{/s}</option>
					<option value="5">{s name="Rate5"}{/s}</option>
					<option value="4">{s name="Rate4"}{/s}</option>
					<option value="3">{s name="Rate3"}{/s}</option>
					<option value="2">{s name="Rate2"}{/s}</option>
					<option value="1">{s name="Rate1"}{/s}</option>
				</select>
			</div>
		{/block}

		{* Review text *}
		{block name='frontend_detail_comment_input_text'}
			<textarea name="sVoteComment" placeholder="{s name="DetailCommentLabelText"}{/s}" cols="3" rows="2" class="review--field{if $sErrorFlag.sVoteComment} has--error{/if}">{$sFormData.sVoteComment|escape}</textarea>
		{/block}

		{* Captcha *}
		{block name='frontend_detail_comment_input_captcha'}
			<div class="review--captcha">

				{* Deferred loading of the captcha image *}
				{block name='frontend_detail_comment_input_captcha_placeholder'}
					<div class="captcha--placeholder" data-src="{url module=widgets controller=Captcha action=refreshCaptcha}"></div>
				{/block}

				{block name='frontend_detail_comment_input_captcha_code'}
					<div class="captcha--code">
						<input type="text" name="sCaptcha" class="review--field{if $sErrorFlag.sCaptcha} has--error{/if}" placeholder="{s name="DetailCommentLabelCaptcha"}{/s}*" />
					</div>
				{/block}
			</div>
		{/block}

		{* Notice that all fields which contains a star symbole needs to be filled out *}
		{block name='frontend_detail_comment_input_notice'}
			<p class="review--notice">
				{s name="DetailCommentInfoFields"}{/s}
			</p>
		{/block}

		{* Review actions *}
		{block name='frontend_detail_comment_input_actions'}
			<div class="review--actions">

				{* Publish review button *}
				{block name='frontend_detail_comment_input_actions_submit'}
					<button type="submit" class="btn btn--primary" name="Submit">
						{s name="DetailCommentActionSave"}{/s}
					</button>
				{/block}
			</div>
		{/block}
	</form>
{/block}